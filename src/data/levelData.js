export const moveTypes = ['forward', 'left', 'right', 'jump', 'light', 'f1', 'f2']
export const blockTypes = ['walk', 'light']
export const levels = [
    {
        "id": 0,
        "section_id": 0,
        "level_data": [
            { "x": 0, "y": 0, "z": 0, "type": blockTypes[0] },
            { "x": 1, "y": 0, "z": 0, "type": blockTypes[0] },
            { "x": 2, "y": 0, "z": 0, "type": blockTypes[1] }
        ],
        "available_blocks": [moveTypes[0], moveTypes[4]]
    },
    {
        "id": 1,
        "section_id": 0,
        "level_data": [
            { "x": 0, "y": 2, "z": 0, "type": blockTypes[0] },
            { "x": 0, "y": 1, "z": 0, "type": blockTypes[0] },
            { "x": 0, "y": 0, "z": 0, "type": blockTypes[0] },
            { "x": 1, "y": 0, "z": 0, "type": blockTypes[0] },
            { "x": 2, "y": 2, "z": 0, "type": blockTypes[1] },
            { "x": 2, "y": 1, "z": 0, "type": blockTypes[0] },
            { "x": 2, "y": 0, "z": 0, "type": blockTypes[0] }
        ],
        "available_blocks": [moveTypes[0], moveTypes[4]]
    },
    {
        "id": 2,
        "section_id": 0,
        "level_data": [
            { "x": 0, "y": 1, "z": 3, "type": blockTypes[0] },
            { "x": 0, "y": 0, "z": 2, "type": blockTypes[0] },
            { "x": 1, "y": 1, "z": 4, "type": blockTypes[1] },
            { "x": 1, "y": 0, "z": 0, "type": blockTypes[0] },
        ],
        "available_blocks": [moveTypes[0], moveTypes[4]]
    }
]