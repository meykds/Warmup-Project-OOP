import json
import urllib2
import webapp2
import os

from google.appengine.ext import db
from google.appengine.ext.webapp.template import render


class MainPage(webapp2.RequestHandler):
    def get(self):
        tmpl = os.path.join(os.path.dirname(__file__), 'templates/index.html')
        context = {'none': "none"}
        self.response.out.write(render(tmpl, context))


def downloadTime(lon, lat, timestamp):
    j = urllib2.urlopen('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lon +  '&timestamp=' + timestamp)
    js = json.load(j)
    return js


class GetTime(webapp2.RequestHandler):

    def get(self):
        lon = self.request.get('lon')
        lat = self.request.get('lat')
        timestamp = self.request.get('timestamp')
        q = downloadTime(lon, lat, timestamp)
        self.response.headers['Content-Type'] = 'text/json'
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        self.response.out.write(json.dumps(q))

application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/getTime', GetTime),
], debug=True)
