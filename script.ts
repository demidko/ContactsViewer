class Contact {
    readonly fullData: string

    constructor(
        readonly name: string,
        readonly post: string,
        readonly phone: string,
        readonly email: string,
        readonly school: string,
        readonly departament: string) {
        this.fullData = `Имя: ${name}
                        Школа: ${school}
                        Кафедра: ${departament}
                        Должность: ${post}
                        Телефон: ${phone}
                        Почта: ${email}`
    }
}

class ContactsPrinter {
    constructor(private readonly list: HTMLElement) { }

    print(person: Contact) {
        const view = document.createElement("li")
        view.innerText = person.fullData
        this.list.appendChild(view)
    }
}

document.body.style.backgroundColor = 'whitesmoke'
const printer = new ContactsPrinter(document.getElementById('contacts_list'))
printer.print(new Contact('Вася', 'Император', '0-/89-*76+00', '@0410', 'ШУГ27', '_+h'))