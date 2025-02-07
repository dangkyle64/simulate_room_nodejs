import torch 
import torch.nn as nn 
from Pix2Vox.models.encoder import Encoder
from Pix2Vox.models.decoder import Decoder
from Pix2Vox.models.merger import Merger 
from Pix2Vox.models.refiner import Refiner

class Pix2Vox(nn.Module):
    def __init__(self):
        super(Pix2Vox, self).__init__()
        self.encoder = Encoder()
        self.decoder = Decoder()
        self.merger = Merger()
        self.refiner = Refiner()
    
    def forward(self, x):
        features = self.encoder(x)
        voxel_grid = self.decoder(features)
        merged_voxels = self.merger(voxel_grid)
        refined_voxels = self.refiner(merged_voxels)
        return refined_voxels

model = Pix2Vox()