import {
    html,
    render,
    useEffect,
    useState
    } from "https://unpkg.com/htm/preact/standalone.module.js";

    const getDateLocaleString = (date = new Date()) =>
    date.toLocaleString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    /**
     * Hook to get date and time information.
     *
     * @returns {[weekday: string, dayAndMonth: string, year: string, time: string]} Tuple of 4 elements with date information.
     */
    const useDateTimeTuple = () => {
    const [dateLocaleString, setDateLocaleString] = useState(
        getDateLocaleString(new Date())
    );

    useEffect(() => {
        const interval = setInterval(() => {
        setDateLocaleString(getDateLocaleString(new Date()));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return dateLocaleString.split(", ");
    };

    /**
     * DateTime component.
     */
    const DateTime = () => {
    const [weekday, dayAndMonth, year, time] = useDateTimeTuple();

    return html`
        <main class="flex h-screen items-center justify-center w-screen">
        <span class="m-2 text-blue-700 text-7xl">${time}</span>
        <span class="m-2 text-red-400 text-5xl uppercase">${weekday}</span>
        <span class="m-2 text-red-400 text-2xl uppercase">
            ${dayAndMonth}, ${year}
        </span>
        </main>
    `;
    };

    render(html`<${DateTime} />`, document.body);