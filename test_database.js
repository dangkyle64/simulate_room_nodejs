let furniture = [
    { id: 1, type: 'chair', length: 3, width: 2, height: 1},
    { id: 2, type: 'table', length: 2, width: 7, height: 1}
];

let room = [
    { id: 1, length: 5, width: 5, height: 5},
    { id: 2, length: 10, width: 10, height: 10}
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

const updateFurniture = (id, updatedData) => {
    const index = furniture.findIndex(furniture => furniture.id === id);

    if (index !== -1) {
        furniture[index] = { ...furniture[index], ...updatedData};
        return furniture[index];
    };
    return null;
};

const deleteFurniture = (id) => {

    const index = furniture.findIndex(furniture => furniture.id === id);

    if (index !== -1) {
        furniture.splice(index, 1);
        return true;
    };
    return false;
};

//Room mock db functions ----------------------------------------------------------------------------------------------------------------//
const getAllRooms = () => {
    return room;
};

const getRoomById = (id) => {
    return room.find(room => room.id === id);
};

const addRoom = (newRoom) => {
    newRoom.id = room.length + 1;
    room.push(newRoom);
    return newRoom;
};

const updateRoom = (id, updatedData) => {
    const index = furniture.findIndex(room => room.id === id);

    if (index !== -1) {
        room[index] = { ...room[index], ...updatedData};
        return room[index];
    };
    return null;
};

const deleteRoom = (id) => {
    const index = room.findIndex(room => room.id === id);

    if (index !== -1) {
        room.splice(index, 1);
        return true;
    };
    return false;
};

module.exports = { getAllFurnitures, getFurnitureById, updateFurniture, deleteFurniture, addFurniture, getAllRooms, getRoomById, addRoom };