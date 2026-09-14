        function Hello() {
            alert('Hello, World!');
            var a = prompt('Who are you?');
            console.log('User: ' + a);
            document.getElementById('title').innerHTML = 'Hello, ' + a + '!';
        }

        Hello();