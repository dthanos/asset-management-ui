export function datetimeDatabaseToHuman(datetime): string {
    if(!datetime) return '-';
    datetime = datetime.split('.')[0];
    const datetimeArray = datetime.split(/[\sT]+/);
    const dateArray = datetimeArray[0].split('-');
    if(datetimeArray.length == 2){// DateTime
        const timeArray = datetimeArray[1].split(':');
        return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} ${timeArray[0]}:${timeArray[1]}`;
    } else {// Date
        return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
    }
}