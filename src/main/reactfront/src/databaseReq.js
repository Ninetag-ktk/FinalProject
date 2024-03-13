export const insertEvent = (endTime, startTime, title, contents, calendarid) => {
    const google = JSON.parse(window.sessionStorage.getItem("token"));
    return {
        method: "POST",
        url: `https://www.googleapis.com/calendar/v3/calendars/${calendarid}/events`,
        params: {key: google.key},
        headres: {
            'Authorization': `Bearer ${google.access}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: {
            "end": {
                "dateTime": endTime
            },
            "start": {
                "dateTime": startTime
            },
            "summary": title,
            "description": contents,
        }
    }
}