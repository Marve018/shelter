import axiosInstance from "../utils/axiosInstance";

// user registration
export const registerUser = async (userData) => {
    const response = await axiosInstance.post("/api/users/register", userData);
    return response.data;
};

// user login
export const loginUser = async (loginData) => {
    const response = await axiosInstance.post("/api/users/login", loginData);
    return response.data;
};

// get all properties
export const getProperties = async () => {
    const response = await axiosInstance.get("/api/properties");
    return response.data;
};

// get property by id
export const getPropertyById = async (propertyId) => {
    const response = await axiosInstance.get(`/api/properties/${propertyId}`);
    return response.data;
};

// create new properties
export const createProperty = async (propertyData) => {
    const response = await axiosInstance.post("/api/properties", propertyData);
    return response.data;
};

// update properties
export const updateProperty = async (propertyId, propertyData) => {
    const response = await axiosInstance.put(`/api/properties/${propertyId}`, propertyData);
    return response.data;
};

// delete properties by id
export const deleteProperty = async (propertyId) => {
    const response = await axiosInstance.delete(`/api/properties/${propertyId}`);
    return response.data;
};

// search and filter properties
export const searchProperties = async (searchParams) => {
    const response = await axiosInstance.get("/api/properties/search", { params: searchParams });
    return response.data;
};

// upload image
export const uploadImage = async (imageData) => {
    const response = await axiosInstance.post("/api/uploads", imageData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// book a property
export const bookProperty = async (bookingData) => {
    const response = await axiosInstance.post("/api/bookings", bookingData);
    return response.data;
};

// fetch user profile
export const getUserProfile = async (userId) => {
    const response = await axiosInstance.get(`/api/users/${userId}`);
    return response.data;
};

// update user profile
export const updateUserProfile = async (userId, userData) => {
    const response = await axiosInstance.put(`/api/users/${userId}`, userData);
    return response.data;
};

// fetch user bookings
export const getUserBookings = async (userId) => {
    const response = await axiosInstance.get(`/api/bookings/user/${userId}`);
    return response.data;
};

// fetch bookings for a property owner
export const getOwnerBookings = async (ownerId) => {
    const response = await axiosInstance.get(`/api/bookings/owner/${ownerId}`);
    return response.data;
};

// approve a booking (for a property owner)
export const approveBooking = async (bookingId) => {
    const response = await axiosInstance.put(`/api/bookings/approve/${bookingId}`);
    return response.data;
};

// reject a booking (for a property owner)
export const rejectBooking = async (bookingId) => {
    const response = await axiosInstance.put(`/api/bookings/reject/${bookingId}`);
    return response.data;
};


