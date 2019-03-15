var ProgressBar = /** @class */ (function () {
    function ProgressBar(container) {
        this.container = container;
        this.bar = document.createElement('progress');
        this.active = false;
    }
    /// true if success; false if already is shown
    ProgressBar.prototype.show = function (downloadRequest) {
        var _this = this;
        if (this.active) {
            return false;
        }
        downloadRequest.onprogress = function (e) {
            _this.bar.max = e.total;
            _this.bar.value = e.loaded;
        };
        this.container.appendChild(this.bar);
        this.active = true;
        return true;
    };
    ProgressBar.prototype.hide = function () {
        if (this.active) {
            this.container.removeChild(this.bar);
            this.active = false;
        }
    };
    ProgressBar.Global = new ProgressBar(document.getElementById('progress-bar'));
    return ProgressBar;
}());
var DownloadError = /** @class */ (function () {
    function DownloadError(link, code, message) {
        this.link = link;
        this.code = code;
        this.message = message;
    }
    return DownloadError;
}());
function downloadFileAsync(url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        ProgressBar.Global.show(req);
        req.open('GET', url);
        req.responseType = 'text';
        req.onload = function () {
            req.status == 200 ?
                resolve(req.responseText) :
                reject(new DownloadError(url, req.status, 'Не получилось загрузить данные 😢'));
            ProgressBar.Global.hide();
        };
        req.onerror = function () { return reject(new DownloadError(url, req.status, 'Не получилось загрузить данные 😢')); };
        req.send();
    });
}
function onDownloadSuccessful(src) {
}
var DownloadErrorView = /** @class */ (function () {
    function DownloadErrorView(error) {
        this.div = document.createElement('div');
        this.div.className = 'error';
        this.addLine('Ошибка: ', error.message);
        this.addLine('Код: ', error.code.toString());
        this.addLine('Ссылка: ', error.link);
    }
    DownloadErrorView.prototype.addLine = function (title, value) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = "<strong>" + title + "</strong> " + value;
        this.div.appendChild(wrapper);
    };
    return DownloadErrorView;
}());
var ErrorsViewer = /** @class */ (function () {
    function ErrorsViewer(container) {
        this.container = container;
    }
    ErrorsViewer.prototype.clear = function () {
        while (this.container.firstChild) {
            this.container.firstChild.remove();
        }
    };
    ErrorsViewer.prototype.add = function (error) {
        this.container.appendChild(new DownloadErrorView(error).div);
    };
    ErrorsViewer.Global = new ErrorsViewer(document.getElementById('messages-box'));
    return ErrorsViewer;
}());
var ReloadAppButton = /** @class */ (function () {
    function ReloadAppButton(container) {
        var _this = this;
        this.container = container;
        this.button = document.createElement('button');
        this.button.className = 'round-button';
        this.button.innerText = '↺';
        this.button.onclick = function (e) {
            ErrorsViewer.Global.clear();
            container.removeChild(_this.button);
            runApp();
        };
    }
    ReloadAppButton.prototype.show = function () {
        this.container.appendChild(this.button);
    };
    ReloadAppButton.Global = new ReloadAppButton(document.body);
    return ReloadAppButton;
}());
function onDownloadError(error) {
    ErrorsViewer.Global.add(error);
    ReloadAppButton.Global.show();
}
function runApp() {
    var contactsLink = 'https://github.com/';
    downloadFileAsync(contactsLink).then(onDownloadSuccessful, onDownloadError);
}
runApp();
