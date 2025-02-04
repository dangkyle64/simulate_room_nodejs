// image processing && Calling the AI Model here
// AI model will take image -> convert to 3D Object
// Options are NeRF from NVIDIA, Pix2Vox, Deep3D, 3D-R2N2
// start with Pix2Vox or MiDaS

//Python based so have to use child process to call the models
// python -> load the ai model then child process call with the image