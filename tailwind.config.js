/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            colors: {
                black: '#000000',
                white: '#ffffff',
                softPurple: '#cfcfff',
                yellowSoft: '#fae37d',
                lightBlue: '#c3ebfa',
                graySoft: '#686e92',
                graybackground: '#f7f8fa'
            }
        },
    },
    plugins: [],
}
