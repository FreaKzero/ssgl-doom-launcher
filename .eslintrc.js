module.exports = {
    "env": {
        "browser": true,
        "node": true
    },

    "globals": {
        "app": true,
        "angular": true,
        "_": true
    },

    "extends": "eslint:recommended",
    "rules": {

        "no-console": [
            "error", { allow: ["log", "warn", "error"] }
        ], 
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
