function sendAuthRequest (channelName, password, url) {  // url === /signup or /login
    return new Promise(function(resolve, reject) {
        // make sure the claim name is still available
        let xhttp;
        const params = `username=${channelName}&password=${password}`;
        console.log(params, url);
        xhttp = new XMLHttpRequest();
        xhttp.open('POST', url, true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 ) {
                if ( this.status == 200) {
                    if (this.response == true) {
                        resolve();
                    } else {
                        reject(new NameError('Your request succedded but could not be completed'));
                    }
                } else if (this.status == 401) {
                    reject('Incorrect username or password')
                } else {
                    reject('Auth request failed with status:' + this.status);
                };
            }
        };
        xhttp.send(params);
    });
}