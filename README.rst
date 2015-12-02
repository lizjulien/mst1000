Decomposed in 5 step, this command :
- use casperjs to scrap all comments on MST blog as json collection and inject it on a landing html page to get a good format for all comments
- use casperjs screenshot feature to take each comment's picture, but based on last screeshot task (health of server saved, because only screenshot the newest posts)
- use spis on mac, mogrify on linux to convert casper png to jpg
- remove all .png files (to keep space)
- send email to wordpress for 25 next comment (start from the last id previous task)

RUN ON OSX :
casperjs getCommentsCollection.js > mst_collection.js && 
casperjs screenshot.js >> lastScreenshot.js &&
sips -s format jpeg ./screenshots/*.png --out ./screenshots/jpegs && 
rm ./screenshots/*.png && 
node wordpressProcess.js >> lastProcess.js

RUN ON LINUX :
casperjs getCommentsCollection.js > mst_collection.js && 
casperjs screenshot.js >> lastScreenshot.js &&
mogrify -format jpg -background white -flatten -path ./screenshots/*.png -quality 100 ./screenshots/jpegs*.jpg
rm ./screenshots/*.png && 
node wordpressProcess.js >> lastProcess.js