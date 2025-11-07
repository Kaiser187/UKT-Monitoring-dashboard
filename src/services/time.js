export default function GetFormatedTime() {
    const date = new Date();
    const hour = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const sec = date.getSeconds().toString().padStart(2, '0');
    return `${hour}:${min}:${sec}`;
}
