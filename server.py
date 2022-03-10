from pydoc import cli
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

# Data imports
from db_recommended import recommended
from db_songs import songs
from db_recently_played import recently_played

app = Flask(__name__)

# ROUTES

@app.route('/')
def home():
    return render_template('homepage.html', playlists=recommended, recent=recently_played)  

# AJAX FUNCTIONS

# For now this view will only show one song, eventually will expand to playlist
@app.route("/view/<id>", methods=["GET"])
def view_playlist(id):
    global songs 

    try:
        id = int(id)
    except ValueError:
        return

    return render_template('view.html', song=songs[id])  

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



if __name__ == '__main__':
   app.run(debug = True)




