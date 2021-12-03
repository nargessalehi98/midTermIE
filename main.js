 function Prediction()
    {
        getFromStorage();
        var name = document.getElementById('textarea').value;

        if(name.length > 255 || name.length < 3) {
            alert('اسم ورودی بین 3 تا 255 کاراکتر باید باشد.');
            return false;
        }

        document.getElementById('output').innerText = null;
        document.getElementById('output1').innerText = null;

        fetch('https://api.genderize.io/?name=' + name)
        .then((resp) => resp.json())
        .then(function(data) {
            let gender = data.gender;
            let probability = data.probability;

            if (gender != null) {
                document.getElementById('output').innerText = 'api result "gender" :' + gender;
                document.getElementById('output1').innerText = 'api result "probability" :' + probability;

                addToStorage(name, gender);
            }

        
        })
        .catch(function(error) {
            console.log(error);
        });
        //getFromStorage();

    }

    function clearStorage()
    {
        var name = document.getElementById('textarea').value;
        window.localStorage.removeItem(name);
        document.getElementById('saveoutput').innerText = 'cleared';
    }

    function saveName()
    {
        var name = document.getElementById('textarea').value;
        var gender = null;

        if (document.getElementById('male').checked) {
            gender = 'male';
        }
        if(document.getElementById('female').checked) {
            gender = 'female';
        }

        if(gender == null) {
            alert('لطفا یک گزینه را انتخاب کنید تا ذخیره شود. در غیر اینصورت جواب پیش بینی به صورت اتومات ذخیره شده است.');
            return false;
        }

        addToStorage(name, gender);
    }
    
    function getFromStorage()
    {
        var name = document.getElementById('textarea').value;
        var check = window.localStorage.getItem(name);
        if(!check) {
            document.getElementById('saveoutput').innerText = null;
        } else {
            
            document.getElementById('saveoutput').innerText = ' gender :' + check;
        }
    }

    function addToStorage(name, gender)
    {

        var check = window.localStorage.getItem(name);
        console.log(check);
        if(!check) {
            var result = window.localStorage.setItem(name, gender);
            console.log('set successfully : ' + window.localStorage.getItem(name));
        } else {
            window.localStorage.removeItem(name);
            var result = window.localStorage.setItem(name, gender);
            console.log('updated successfully : ' + window.localStorage.getItem(name));
        }
    }