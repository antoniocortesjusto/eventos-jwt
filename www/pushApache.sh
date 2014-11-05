rm -rf /Library/WebServer/Documents/*
cp -r /Users/Antonio/eventos-oauth/www  /Library/WebServer/Documents/
apachectl graceful