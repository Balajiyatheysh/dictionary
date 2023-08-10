export interface Data {
    "word": string,
    "phonetics": [
    {
    "audio": "string",
    "sourceUrl": "string",
    "license": License,
    }]
    "meanings": [
        {
            "partOfSpeech": string,
            "definitions": [
            {
                "definition": string,
                "synonyms": [],
                "antonyms": [],
                "example": string,
            }]
        },
        {
            "partOfSpeech": string,
            "definitions": [
            {
                "definition": string,
                "synonyms": [string],
                "antonyms": [],
                "example": string,
            }]
        },
        {
            "partOfSpeech": string,
            "definitions": [
            {
                "definition": string,
                "synonyms": [string, number],
                "antonyms": [],
                "example": string,
            }]
        },
        {
            "partOfSpeech": string,
            "definitions": [
            {
                "definition": string,
                "synonyms": [],
                "antonyms": [],
                "example": string,
            }]
        }
    ] 
}
export interface License{
    "name": "string",
    "url": "string"
}