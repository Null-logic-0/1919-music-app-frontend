export enum ImageSizeVariant {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
    XLarge = 'Xlarge',
    Rounded = 'rounded',
    RoundedXL = 'roundedXl',
    RoundedXXL = 'roundedXxl',
    Absolute = 'absolute',

}


export const imageSizeVariants = {
    [ImageSizeVariant.Small]: { width: 106, height: 106 },
    [ImageSizeVariant.Medium]: { width: 292, height: 292 },
    [ImageSizeVariant.Large]: { width: 372, height: 217 },
    [ImageSizeVariant.XLarge]: { width: 372, height: 285 },
    [ImageSizeVariant.Rounded]: { width: 176, height: 176 },
    [ImageSizeVariant.RoundedXL]: { width: 240, height: 240 },
    [ImageSizeVariant.RoundedXXL]: { width: 240, height: 240 },
    [ImageSizeVariant.Absolute] :{ width: 240, height: 240 },
};