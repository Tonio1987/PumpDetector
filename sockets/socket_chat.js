var socket_handler = function (io) {
    var uuid = require('node-uuid');
    var listUsers = [];
    var fs = require("fs"); //Load the filesystem module

    io.sockets.on('connection', function(socket){

        socket.on('new_user', function(pseudo) {
            reconnect(pseudo);
            console.log('### - Nouvel utilisateur : '+socket.user.pseudo+' [ OK ]');
        });

        socket.on('chat_message', function(pseudo, msg){
            reconnect(pseudo);
            if(detectCommands(msg) === true){
                console.log('### - User '+socket.user.pseudo+' launch command ; '+msg);
                handleCommands(msg);
            }else{
                console.log('### - '+socket.user.pseudo+ ' : ' + msg + " [ OK ]");
                socket.emit('chat_message', socket.user.pseudo, msg);
                socket.broadcast.emit('chat_message', socket.user.pseudo, msg);
            }
        });

        socket.on('code_message', function(pseudo, code){
            reconnect(pseudo);
            code = handleHtmlEntities(code);
            console.log('### - User '+socket.user.pseudo+' sendong code [ OK ]');
            socket.emit('code_message', socket.user.pseudo, code);
            socket.broadcast.emit('code_message', socket.user.pseudo, code);
        });

        socket.on('user_image', function (pseudo, image) {
            reconnect(pseudo);
            if(validFileBroadcasting(image)){
                console.log("### - Broadcasting image ... ");
                //Received an image: broadcast to all
                socket.broadcast.emit('user_image', socket.user.pseudo, image);
                console.log("### - Sending image to source  ... ");
                socket.emit('user_image', socket.user.pseudo, image);
                console.log("### - [ COMPLETED ]");
            }else{
                socket.emit('host_message', 'SERVER', 'WARNING ! File size too large !!! Picture must have a size less than 1.5 MB. Extension allowed : .bnp, .gif, .jpeg, .jpg, .tif, .png');
            }
        });

        socket.on('error', function(obj){
            console.log('error detected');
            console.log("error : "+obj);
        });


        socket.on('user_disconnect', function(pseudo){
            if(socket.user != undefined && socket.user != null){
                removeUser(listUsers, socket.user);
                socket.broadcast.emit('list_users', listUsers);
                socket.broadcast.emit('host_message', 'SERVER', 'Utilisateur '+socket.user.pseudo+' deconnecte');
                console.log('### - Socket user disconnected : '+socket.user.pseudo+' [ OK ]');
            }else{
                console.log("### Old session trying to disconnect ... [ ABORT ]");
            }
        });


        // Create user
        function createObjectUser(pseudo){
            var user = {id: uuid.v4(),
                pseudo: pseudo};
            socket.user = user;
            listUsers.push(socket.user);
        }

        // Handle exotic user pseudo
        function handleHtmlEntities(data){
            data = data.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            data = data.replace(/ /g, '&nbsp;');
            return data;
        }

        // Remove user
        function removeUser(array, item){
            for (var i = array.length - 1; i >= 0; i--)
                if (array[i].id === item.id) {
                    array.splice(i, 1);
                    break; // remove this line if there could be multiple matching elements
                }
        }

        // Reconnect user
        function reconnect(pseudo){
            if(socket.user === undefined || socket.user === null){
                pseudo = handleHtmlEntities(pseudo);
                createObjectUser(pseudo);
                socket.broadcast.emit('host_message', 'SERVER', 'Nouvel utilisateur connecte : '+socket.user.pseudo);
                socket.broadcast.emit('list_users', listUsers);
                socket.emit('list_users', listUsers);
                console.log("Envoi de la liste des utilisateurs ... [ OK ]");
            }
        }

        // Handle big files
        function validFileBroadcasting(file){
            if(file.length <= 2000000){
                return true;
            }else{
                return false;
            }
        }

        function detectCommands(msg){
            if(msg.substring(0, 8) === '/youtube'){
                return true;
            }else if(msg.substring(0, 11) === '/googlemaps'){
                return true;
            }else{
                return false;
            }
        }

        function handleCommands(msg){
            if(msg.substring(0, 8) === '/youtube'){
                var url = msg.substring(9);
                url = url.replace('http', '');
                url = url.replace('v=', '');
                // http://blabla | ? | v=dsfsdffd45dfg15df&trololo=f4sd5fsd4f4
                var step1 = url.split("?");
                // v=dsfsdffd45dfg15df | & | trololo=f4sd5fsd4f4 | & | trili=dsfsd5f45dsf5
                var step2 = step1[step1.length-1].split("&");
                // On recupere le premier params ?
                var id = step2[0];

                var realUrl = '//www.youtube.com/embed/'+id;

                socket.emit('youtube_message', socket.user.pseudo, realUrl);
                socket.broadcast.emit('youtube_message', socket.user.pseudo, realUrl);
            }else if(msg.substring(0, 11) === '/googlemaps'){
                url = msg.substring(12);
                socket.emit('googlemaps_message', socket.user.pseudo, url);
                socket.broadcast.emit('googlemaps_message', socket.user.pseudo, url);
            }else{
                socket.emit('host_message', 'SERVER', 'BAD Command : '+msg);
            }
        }

    });
};

module.exports = socket_handler;