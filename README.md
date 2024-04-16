# Fcheck-Backend1
First step in doing this is to convert the JS files to TS files (replacing the extension of all files).
Next, run tsc --init to create a tsconfig.json file (make sure u already have tsc (npm i -g tsc)).
Set strict to false for now until we add all types.
Set outDir to dist so as to not pollute your original folder
Try running it, notice the errors that you see.
The errors you will see should be of the format
'mongoose' was also declared here.
Move all requires => imports to fix these errors. This is related to a bug bug in TS (https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable)
For example, convert
const mongoose = require('mongoose'); to
import mongoose from 'mongoose';
Same thing for exports, export using the modern ES6 syntax
module.exports = mongoose.model('Todo', todoSchema); to
export default mongoose.model('Todo', todoSchema);
Now typescript shouldnt complain, but this isn't the end. We still have to flip on strict to actually see errors.
Check out the errors that you see
Next, run npm install -D @types/node to install the types for node.
Next, run npm install -D @types/express to install the types for express.
Next, run npm install -D @types/mongoose to install the types for mongoose.
You will see a bunch of Parameter 'req' implicitly has an 'any' type. errors. Fix these by adding types to all the functions.
Express exports the Request and Response types, use them to type the req and res params.
If you ever get stuck, initially you can use the any type
You can also just flip noImplicitAny to false in tsconfig, but that's cheating.
You will see req.userId complains everywhere, and rightfully so. We've added userId key to an object that doesn't expect it. Fix this by sending over the id via the headers.
Create types for the inputs to all routes (for eg User, Todo) and use them when u decode the body.
Try running tsc now, you should see no errors.




Aws:
lauch an instance 
then check security 
inbound outbound
inbound is for which which ip can access your website
outbound is which which ip your website can access

so we need to add some inbound ip out bound is automatically added
so add 443 with ivp4 and ivp6 similarly for 80 and 3000
443 is for https 80 is for http

ssh -i Fcheck-key-pair.pem ubuntu@ec2-44-203-250-210.compute-1.amazonaws.com
//it will not work as in aws the permission are very restrictive 
//it means who can read write with your project
ls -ltr Fcheck-key-pair.pem  
to see who have which permission

chmod 600 ./Fcheck-key-pair.pem
//this command remove read permission for some of the users

//now run this command
ssh -i Fcheck-key-pair.pem ubuntu@ec2-44-203-250-210.compute-1.amazonaws.com


now are cloned to ec2 instance similary like git repo

//now you clone your git code to ec2 using 
git clone https://github.com/aakashloyar/Fcheck-Backend1.git


to run node on your ubuntu machine 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

after running copy the last 3 lines of response in terminal
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


run
nvm install node
npm install
node index.js
npm

vi index.js esc
to edit a file 
:wq 
to save and exit

sudo lsof -i :3000
this will give pid of running process
sudo kill pid
this will end the process

npm i -g pm2
pm2 start index.js
pm2 kill

rm file name
delete the file
*****how to update

1. ssh into machine
2. pull your latest code
3. stop existing process
4. re-build the code
5. re run the code



***to make it short
we have make deploy.sh file and run that by source ./deploy.sh command
so now only 2 command
1 is ssh 
2 is running deploy.sh

now we can do this in 1 command 
by pasting above 2 command in one file script-local.sh and run source ./script-deploy.sh


**ci/cd
using it whatever we push on github it will automatically deployed
so now you donot have to run any command to deploy


**echo xxx keyfile
means put xxx in keyfile



****origin
1 project can be cloned to different repos
so origin is used as convention to push pull or whatever to your correct repo
suppose for 1 repo origin is origin and for other origin is origin2


****
your secrets in git
store in settings/secret and varible/actions/add new repo secret 
give name to it 
and paste the secret for eg here whatever in Fcheck-key-pair.pem