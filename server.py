from pydoc import cli
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, json
import time

# Data imports
from db_recommended import recommended
from db_songs import songs
from db_recently_played import recently_played
from db_user_playlists import user_playlists
from db_playlists import all_playlists
from db_genres import genre_playlists

app = Flask(__name__)

USER_ID = "mb4753"

# ROUTES

@app.route('/')
def home():
    result_recommended = {}
    result_recent = {}

    playlist_ids = recommended.get(USER_ID)
    song_ids = recently_played.get(USER_ID)[-5:]

    for id in playlist_ids:
        result_recommended[id] = all_playlists.get(id)

    for id in song_ids:
        result_recent[id] = songs.get(id)

    print(recently_played)
    return render_template('homepage.html', playlists=result_recommended, recent=result_recent)  

@app.route('/genres/<name>', methods=["GET"])
def genre_single(name):
    result = {}

    playlist_ids = genre_playlists.get(name.lower())

    for id in playlist_ids:
        result[id] = all_playlists.get(id)

    return render_template('genre_view.html', playlists=result)

@app.route('/playlists')
def playlists():
    result = {}

    playlist_ids = user_playlists.get(USER_ID)

    for id in playlist_ids:
        result[id] = all_playlists.get(id)

    return render_template('playlists.html', playlists=result)  

@app.route("/view/<id>", methods=["GET"])
def playlists_single(id):

    try:
        id = int(id)
    except ValueError:
        return
    
    playlist = all_playlists.get(id)
    track_ids = playlist['tracks']

    tracks = []
    for track in track_ids:
        obj = songs.get(track)
        tracks.append(obj)

    result = dict(playlist)
    result['tracks'] = tracks

    return render_template('playlist_view.html', playlist=result)  

@app.route("/edit/<id>", methods=["GET"])
def playlists_edit(id):

    try:
        id = int(id)
    except ValueError:
        return
    
    playlist = all_playlists.get(id)
    track_ids = playlist['tracks']

    tracks = []
    for track in track_ids:
        obj = songs.get(track)
        tracks.append(obj)

    result = dict(playlist)
    result['tracks'] = tracks

    return render_template('playlist_edit.html', playlist=result)  

@app.route('/add')
def playlists_add():
    return render_template('playlist_add.html')  

@app.route('/genres')
def genres():
    return render_template('genres.html')  

# AJAX FUNCTIONS

@app.route("/search/<query>", methods=["GET"])
def search(query):
    if not query:
        return render_template('search.html', results=None)

    results = {"songs" : [], "playlists" : {}}

    # Search songs
    for k,v in songs.items():
        if query.lower() in v['name'].lower() \
            or query.lower() in v['artists'][0]['name'].lower() \
            or query.lower() in v['description'].lower() :
            results["songs"].append(songs[k])

    # Search playlists
    for k,v in all_playlists.items():
        if query.lower() in v['name'].lower() \
            or query.lower() in v['description'].lower():
            results["playlists"][k] = all_playlists[k]

    return render_template('search.html', results=results)


@app.route("/songs", methods=["GET"])
def get_songs():
    return songs

@app.route("/songs/<id>", methods=["GET"])
def get_song(id):
    try:
        id = int(id)
    except ValueError:
        return

    return songs.get(id)
    

@app.route('/playlists/<id>', methods=['PATCH'])
def edit_playlist(id):

    try:
        id = int(id)
    except ValueError:
        return {}

    json_data = request.get_json()   
    playlist = all_playlists.get(id)

    if not playlist:
        return {}

    for k, v in json_data.items():
        playlist[k] = v

    return playlist

@app.route('/playlists', methods=['POST'])
def add_playlist():

    # Simply use length of the playlists db as the ID
    id = len(all_playlists) + 1

    playlist = request.get_json()
    playlist['dateCreated'] = int(time.time())
    playlist['createdBy'] = USER_ID
    playlist['id'] = id

    all_playlists[id] = playlist
    user_playlists[USER_ID].append(id)

    return playlist

@app.route('/recents/<user>', methods=['PATCH'])
def edit_recents(user):

    if user != USER_ID:
        return {}

    json_data = request.get_json() 
    song_id = json_data.get("songId")

    if(song_id):
        recently_played[user].append(song_id)

    # No need to return anything for this endpoint
    return {}

if __name__ == '__main__':
   app.run(debug = True)




