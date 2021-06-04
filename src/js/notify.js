import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const callError = () => {
    const myError = error({
        title: 'Введите запрос!',
        sticker: false,
    });
}

const callNotice = () => {
    const myNotice = notice({
        title: 'Вы просмотрели все фото по Вашему запросу!',
        sticker: false,
    });
}
export {callError, callNotice}