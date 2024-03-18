const googleKey = "AIzaSyCJ5FEADdIsIcgjx7foyIqvi05XYAN_2xw"

export const insertNote = (note, allDay) => {
    const token = JSON.parse(window.sessionStorage.getItem("token"));
    const type = note.categoryId.split("\^")[1];
    const categoryId = note.categoryId.split("\^")[2].replaceAll("_", ".");
    switch (type) {
        case "calendar": {
            if (allDay) {
                return {
                    method: "POST",
                    url: `https://www.googleapis.com/calendar/v3/calendars/${categoryId}/events`,
                    params: {key: googleKey},
                    headers: {
                        'Authorization': `Bearer ${token.access}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: {
                        "end": {
                            "date": note.endTime.slice(0, 10),
                        },
                        "start": {
                            "date": note.startTime.slice(0, 10),
                        },
                        "summary": note.title,
                        "description": note.contents,
                    }
                }
            } else {
                return {
                    method: "POST",
                    url: `https://www.googleapis.com/calendar/v3/calendars/${categoryId}/events`,
                    params: {key: googleKey},
                    headers: {
                        'Authorization': `Bearer ${token.access}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: {
                        "end": {
                            "dateTime": note.endTime.slice(0, -1) + "+09:00",
                        },
                        "start": {
                            "dateTime": note.startTime.slice(0, -1) + "+09:00",
                        },
                        "summary": note.title,
                        "description": note.contents,
                    }
                }
            }
        }
        case "tasks": {
            return {
                method: "POST",
                url: `https://tasks.googleapis.com/tasks/v1/lists/${categoryId}/tasks`,
                params: {key: googleKey},
                headers: {
                    'Authorization': `Bearer ${token.access}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    "due": note.startTime,
                    "title": note.title,
                    "notes": note.contents,
                }
            }
        }
    }
}

export const patchNote = (note, allDay) => {
    const token = JSON.parse(window.sessionStorage.getItem("token"));
    const type = note.categoryId.split("\^")[1];
    const categoryId = note.categoryId.split("\^")[2].replaceAll("_", ".");
    switch (type) {
        case "calendar": {
            if (allDay) {
                return {
                    method: "PATCH",
                    url: `https://www.googleapis.com/calendar/v3/calendars/${categoryId}/events/${note.id}`,
                    params: {key: googleKey},
                    headers: {
                        'Authorization': `Bearer ${token.access}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: {
                        "end": {
                            "date": note.endTime.slice(0, 10),
                        },
                        "start": {
                            "date": note.startTime.slice(0, 10),
                        },
                        "summary": note.title,
                        "description": note.contents,
                        "reminders": {
                            "overrides": [],
                            "useDefault": false,
                        }
                    }
                }
            } else {
                return {
                    method: "PATCH",
                    url: `https://www.googleapis.com/calendar/v3/calendars/${categoryId}/events/${note.id}`,
                    params: {key: googleKey},
                    headers: {
                        'Authorization': `Bearer ${token.access}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: {
                        "end": {
                            "dateTime": note.endTime.slice(0, -1) + "+09:00",
                        },
                        "start": {
                            "dateTime": note.startTime.slice(0, -1) + "+09:00",
                        },
                        "summary": note.title,
                        "description": note.contents,
                        "reminders": {
                            "overrides": [],
                            "useDefault": false,
                        }
                    }
                }
            }
        }
        case "tasks": {
            return {
                method: "PATCH",
                url: `https://tasks.googleapis.com/tasks/v1/lists/${categoryId}/tasks/${note.id}`,
                params: {key: googleKey},
                headers: {
                    'Authorization': `Bearer ${token.access}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    "due": note.startTime,
                    "title": note.title,
                    "notes": note.contents,
                    "status": "needsAction",
                }
            }
        }
    }
}

export const deleteNote = (note) => {
    const token = JSON.parse(window.sessionStorage.getItem("token"));
    const type = note.categoryId.split("\^")[1];
    const categoryId = note.categoryId.split("\^")[2].replaceAll("_", ".");
    switch (type) {
        case "calendar": {
            return {
                method: "DELETE",
                url: `https://www.googleapis.com/calendar/v3/calendars/${categoryId}/events/${note.id}`,
                params: {key: googleKey},
                headers: {
                    'Authorization': `Bearer ${token.access}`,
                    'Accept': 'application/json',
                },
            }
        }
        case "tasks": {
            return {
                method: "POST",
                url: `https://tasks.googleapis.com/tasks/v1/lists/${categoryId}/tasks/${note.id}`,
                params: {key: googleKey},
                headers: {
                    'Authorization': `Bearer ${token.access}`,
                    'Accept': 'application/json',
                },
            }
        }
    }
}