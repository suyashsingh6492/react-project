export async function fetchAvailablePlaces() {
    const resp = await fetch('http://localhost:3000/places');

    const respData = await resp.json();
    if (!resp.ok) { ///ok=200 300
        const error = new Error('Failed to fetch place');
        throw error;

    }
    return respData;
}

export async function updateUserPlaces(places) {
    const resp = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const respData = await resp.json();

    if (!resp.ok) {
        throw new Error('Failed to update user place');;

    }

    return respData.message;
}

export async function fetchUserPlaces() {
    const resp = await fetch('http://localhost:3000/user-places');

    const respData = await resp.json();
    if (!resp.ok) { ///ok=200 300
        const error = new Error('Failed to fetch user place');
        throw error;

    }
    return respData;
}