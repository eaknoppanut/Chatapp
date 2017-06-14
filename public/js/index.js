var socket = io();

function scrollToBottom(){
        var message = jQuery('#messages')
        // var newMessage= messages.children('li:last-child')

        var clientHeight= message.prop('clientHeight')
        var scrollTop= message.prop('scrollTop')
        var scrollHeight= message.prop('scrollHeight')

        // var newMessageHeight = newMessage.innerHeight()
      

        if(clientHeight + scrollTop >= scrollHeight){
                console.log('Should Scroll')
        }
}

socket.on('connect', function(){
        console.log('Server connected');

});

  socket.on('disconnect', function() {
        console.log('disconnect form server');
});

socket.on('newMessage', function(message) {
        var template= jQuery('#message-template').html()
        var html =Mustache.render(template,{
        text: message.text,
        from: message.from
        })
        jQuery('#messages').append(html)
        scrollToBottom()
});


jQuery('#message-form').on('submit',function(e){
        e.preventDefault()

        var messageTextbox = jQuery('[name=message]')

socket.emit('createMessage',{
        from: 'User',
        text: messageTextbox.val()
},function(){
        messageTextbox.val('')
        })
})