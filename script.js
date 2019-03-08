var Contact = /** @class */ (function () {
    function Contact(name, post, phone, email, school, departament) {
        this.name = name;
        this.post = post;
        this.phone = phone;
        this.email = email;
        this.school = school;
        this.departament = departament;
        this.fullData = "\u0418\u043C\u044F: " + name + "\n                        \u0428\u043A\u043E\u043B\u0430: " + school + "\n                        \u041A\u0430\u0444\u0435\u0434\u0440\u0430: " + departament + "\n                        \u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C: " + post + "\n                        \u0422\u0435\u043B\u0435\u0444\u043E\u043D: " + phone + "\n                        \u041F\u043E\u0447\u0442\u0430: " + email;
    }
    return Contact;
}());
var ContactsPrinter = /** @class */ (function () {
    function ContactsPrinter(list) {
        this.list = list;
    }
    ContactsPrinter.prototype.print = function (person) {
        var view = document.createElement("li");
        view.innerText = person.fullData;
        this.list.appendChild(view);
    };
    return ContactsPrinter;
}());
document.body.style.backgroundColor = 'whitesmoke';
var printer = new ContactsPrinter(document.getElementById('contacts_list'));
printer.print(new Contact('Вася', 'Император', '0-/89-*76+00', '@0410', 'ШУГ27', '_+h'));
//# sourceMappingURL=script.js.map