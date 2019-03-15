class ProgressBar {
    private readonly bar = document.createElement('progress')
    private active = false

    public static readonly Global = new ProgressBar(document.getElementById('progress-bar'))

    /// true if success; false if already is shown
    public show(downloadRequest: XMLHttpRequest): boolean {
        if (this.active) {
            return false
        }
        downloadRequest.onprogress = (e) => {
            this.bar.max = e.total
            this.bar.value = e.loaded
        }
        this.container.appendChild(this.bar)
        this.active = true
        return true
    }

    public hide() {
        if (this.active) {
            this.container.removeChild(this.bar)
            this.active = false
        }
    }

    public constructor(private readonly container: HTMLElement) { }
}


class DownloadError {
    constructor(readonly link: string, readonly code: number, readonly message?: string) { }
}

function downloadFileAsync(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest()
        ProgressBar.Global.show(req)
        req.open('GET', url)
        req.responseType = 'text'
        req.onload = () => {
            req.status == 200 ?
                resolve(req.responseText) :
                reject(new DownloadError(url, req.status, 'Не получилось загрузить данные 😢'))
            ProgressBar.Global.hide()
        }
        req.onerror = () => reject(new DownloadError(url, req.status, 'Не получилось загрузить данные 😢'))
        req.send()
    });
}

function onDownloadSuccessful(src: string) {

}

class DownloadErrorView {
    public readonly div: HTMLDivElement = document.createElement('div')

    private addLine(title: string, value: string) {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = `<strong>${title}</strong> ${value}`
        this.div.appendChild(wrapper)
    }

    public constructor(error: DownloadError) {
        this.div.className = 'error'
        this.addLine('Ошибка: ', error.message)
        this.addLine('Код: ', error.code.toString())
        this.addLine('Ссылка: ', error.link)
    }
}

class ErrorsViewer {
    clear() {
        while (this.container.firstChild) {
            this.container.firstChild.remove()
        }
    }

    add(error: DownloadError) {
        this.container.appendChild(new DownloadErrorView(error).div)
    }

    constructor(private readonly container: HTMLElement) { }

    static readonly Global = new ErrorsViewer(document.getElementById('messages-box'))
}

class ReloadAppButton {
    private readonly button = document.createElement('button')

    public show() {
        this.container.appendChild(this.button)
    }

    public constructor(private readonly container: HTMLElement) {
        this.button.className = 'round-button'
        this.button.innerText = '↺'
        this.button.onclick = e => {
            ErrorsViewer.Global.clear()
            container.removeChild(this.button)
            runApp()
        }
    }

    public static readonly Global = new ReloadAppButton(document.body)
}



function onDownloadError(error: DownloadError) {
    ErrorsViewer.Global.add(error)
    ReloadAppButton.Global.show()
}

function runApp() {
    const contactsLink = 'https://github.com/'
    downloadFileAsync(contactsLink).then(onDownloadSuccessful, onDownloadError)
}

runApp()
