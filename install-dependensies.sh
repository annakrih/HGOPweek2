

#installing nvm
echo '-- Installing nvm'
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # loading nvm

#installing nodejs
echo '-- Installing node js' 
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
nvm install node 6.9.1
nvm use 6.9.1
PATH=./node_modules/.bin:$PATH #adding to PATH

#installing nodemon
echo '-- Installing nodemon'
npm install -g nodemon

# Start new posgres container from postgres docker container
npm run startpostgres && sleep 10 && npm run migratedb
# Install npm dependencies

sudo npm install
sudo npm run build
