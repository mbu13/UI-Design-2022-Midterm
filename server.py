from pydoc import cli
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, json

# Data imports
from db_recommended import recommended
from db_songs import songs
from db_recently_played import recently_played
from db_user_playlists import user_playlists
from db_playlists import all_playlists

app = Flask(__name__)

USER_ID = "mb4753"

# ROUTES

@app.route('/')
def home():
    result_recommended = {}
    result_recent = {}

    playlist_ids = recommended.get(USER_ID)
    song_ids = recently_played.get(USER_ID)

    for id in playlist_ids:
        result_recommended[id] = all_playlists.get(id)

    for id in song_ids:
        result_recent[id] = songs.get(id)

    return render_template('homepage.html', playlists=result_recommended, recent=result_recent)  

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

# AJAX FUNCTIONS

@app.route("/search/<query>", methods=["GET"])
def search(query):
    global songs 

    if not query:
        return render_template('search.html', results=None)

    results = []
    for k,v in songs.items():
        if query.lower() in v['name'].lower():
            results.append(songs[k])

    return render_template('search.html', results=results)

@app.route("/songs/<id>", methods=["GET"])
def get_song(id):
    try:
        id = int(id)
    except ValueError:
        return

    return songs.get(id)
    

if __name__ == '__main__':
   app.run(debug = True)




