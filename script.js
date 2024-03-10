class User{
    constructor(firstName, lastName, email, job, phoneNumber){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.job=job;
        this.phoneNumber=phoneNumber;
        this.users=[];
    }
}

class UserService{
    static url = "https://65de929edccfcd562f570852.mockapi.io/users";

    static getAllUsers(){
        return $.get(this.url);
    }

    static createUser(user){
        return $.post(this.url, user);
    }

    static deleteUser(id){
        return $.ajax({
            url:this.url + `/${id}`,
            type: 'DELETE'
        });
    }

}

class DOMManager{
    static users

    static getAllUsers(){
        UserService.getAllUsers().then(users=>this.render(users));
    }

    static createUser(firstName, lastName, email, job, phoneNumber){
        UserService.createUser(new User(firstName, lastName, email, job, phoneNumber))
            .then(()=>{
                return UserService.getAllUsers();
            })
            .then((users)=> this.render(users));
    }

    static deleteUser(id){
        UserService.deleteUser(id)
        .then(() => {
            return UserService.getAllUsers();
        })
        .then((users) => this.render(users));
    }

    static render(users){
        $('#list-body').empty();
        let listId = 0;

        for(let user of users){
            let row = $('<tr>').attr('id', `item-${listId}`).appendTo ($('#list-body'));

            $('<td>').text(user.firstName).appendTo(row);
            $('<td>').text(user.lastName).appendTo(row);
            $('<td>').text(user.email).appendTo(row);
            $('<td>').text(user.job).appendTo(row);
            $('<td>').text(user.phoneNumber).appendTo(row);
            $('<td>').append(
                `<button class="btn btn-danger" onclick="DOMManager.deleteUser(${user.id})">DELETE</button>`
            ).appendTo(row);
        }
    }  
}

$('#create-new-user').click(()=>{
    DOMManager.createUser($('#new-user-first-name').val(),$('#new-user-last-name').val(), $('#new-user-email').val(), $('#new-user-job').val(), $('#new-user-phone-number').val());
    $('#new-user-first-name').val('')
    $('#new-user-last-name').val('')
    $('#new-user-email').val('')
    $('#new-user-job').val('')
    $('#new-user-phone-number').val('')
});


// let users = [];
// let user1 = new User('Jack','Ma','jm@outlook.com','person','888-888-888');
// let user2 = new User('Martin','Lee','ml@outlook.com','person','000-000-000');

// users.push(user1);
// users.push(user2);
// console.log(users);

// DOMManager.render(users);

DOMManager.getAllUsers();





