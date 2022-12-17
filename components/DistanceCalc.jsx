import React from 'react';

export default function Map() {
    const [startInput, setStartInput] = React.useState('');
    const [endInput, setEndInput] = React.useState('');
    const [start, setStart] = React.useState({ x: 0, y: 0 });
    const [end, setEnd] = React.useState({ x: 0, y: 0 });
    const [distance, setDistance] = React.useState(0);

    const getDistanceBetweenPoints = (llat1, llong1, llat2, llong2) => {
        // gets coordinates of DD type. Example:
        // Cosy 12.9214197,100.8605911
        // PP 12.9073472,100.8633108
        // Cloud 12.921671,100.8623255

        function degrees(rad) {
            return rad * (180 / Math.PI);
        }
        function radians(deg) {
            return deg * (Math.PI / 180.0);
        }

        // радиус сферы (Земли)
        const RAD = 6372795;

        //в радианах

        let lat1 = (llat1 * Math.PI) / 180;
        let lat2 = (llat2 * Math.PI) / 180;
        let long1 = (llong1 * Math.PI) / 180;
        let long2 = (llong2 * Math.PI) / 180;

        // косинусы и синусы широт и разницы долгот
        let cl1 = Math.cos(lat1);
        let cl2 = Math.cos(lat2);
        let sl1 = Math.sin(lat1);
        let sl2 = Math.sin(lat2);
        let delta = long2 - long1;
        let cdelta = Math.cos(delta);
        let sdelta = Math.sin(delta);

        // вычисления длины большого круга
        let y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
        let x = sl1 * sl2 + cl1 * cl2 * cdelta;
        let ad = Math.atan2(y, x);
        let dist = ad * RAD;

        // вычисление начального азимута
        x = cl1 * sl2 - sl1 * cl2 * cdelta;
        y = sdelta * cl2;
        let z = degrees(Math.atan(-y / x));

        if (x < 0) {
            z = z + 180;
        }

        let z2 = ((z + 180) % 360) - 180;
        z2 = -radians(z2);
        let anglerad2 = z2 - 2 * Math.PI * Math.floor(z2 / (2 * Math.PI));
        let angledeg = (anglerad2 * 180) / Math.PI;

        console.log('Distance', dist, 'meters');
        console.log('Initial bearing >> ', angledeg, '[degrees]');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dist = getDistanceBetweenPoints(start.x, start.y, end.x, end.y);
        setDistance(dist);
    };

    return (
        <form>
            <label>Начальная точка: </label>
            <br />

            <input
                type='text'
                required
                pattern='\d+\.\d+,\s?\d+\.\d+\s?'
                style={{ width: '100%' }}
                value={startInput}
                onChange={(e) => {
                    const value = e.target.value;
                    setStartInput(value);
                    const [x, y] = value.split(',');
                    setStart({ x: +x.trim(), y: +y.trim() });
                }}
            />
            <br />
            <input
                disabled
                type='text'
                value={start.x}
            />
            <input
                disabled
                type='text'
                value={start.y}
            />

            <br />

            <br />
            <label>Конечная точка: </label>
            <br />

            <input
                type='text'
                required
                style={{ width: '100%' }}
                value={endInput}
                onChange={(e) => {
                    const value = e.target.value;
                    setEndInput(value);
                    const [x, y] = value.split(',');
                    setEnd({ x: +x.trim(), y: +y.trim() });
                }}
            />
            <br />
            <input
                disabled
                type='text'
                value={end.x}
            />
            <input
                disabled
                type='text'
                value={end.y}
            />

            <br />
            <br />

            <label>Distance</label>
            <input
                disabled
                type='text'
                inputMode='number'
                value={distance}
            />
            <input
                type='submit'
                value='calculate'
                onClick={handleSubmit}
            />

            <style jsx>
                {`
                    label {
                        margin-right: 1rem;
                    }

                    input:invalid {
                        border: 2px dashed red;
                    }

                    input:valid {
                        border: 2px solid green;
                    }
                `}
            </style>
        </form>
    );
}
