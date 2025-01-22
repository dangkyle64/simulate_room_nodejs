let furniture = [
    { id: 1, type: 'chair', length: 3, width: 2, height: 1},
    { id: 2, type: 'table', length: 2, width: 7, height: 1}
];

let room = [
    { id: 1, length: 5, width: 5, height: 5},
    { id: 1, length: 10, width: 10, height: 10}
];

//Furniture mock db functions ----------------------------------------------------------------------------------------------------------------//
const getAllFurnitures = () => {
    return furniture;
};

const getFurnitureById = (id) => {
    return furniture.find(furniture => furniture.id === id);
};

const addFurniture = (newFurniture) => {
    newFurniture.id = furniture.length + 1;
    furniture.push(newFurniture);
    return newFurniture;
};

//Room mock db functions ----------------------------------------------------------------------------------------------------------------//
const getAllRooms = () => {
    return furniture;
};

const getRoomById = (id) => {
    return furniture.find(furniture => furniture.id === id);
};

const addRoom = (newRoom) => {
    newRoom.id = room.length + 1;
    room.push(newRoom);
    return newRoom;
};

module.exports = { getAllFurnitures, getFurnitureById, addFurniture, getAllRooms, getRoomById, addRoom };