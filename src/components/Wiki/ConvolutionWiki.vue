<template>
    <div>
        Every frame, the image is updated using a <a href='https://en.wikipedia.org/wiki/Kernel_(image_processing)#Convolution' target="_blank">convolution</a> algorithm.
        The filter is slid over each pixel and its neighbors, then the filter weights are multiplied with the corresponding pixel values and added up.  
        Refer to the animation:
        <img src="../../assets/img/convolution.gif" alt='convolution demo'>
    </div>

</template>

<script>

export default {
    name: 'ConvolutionWiki',
}
</script>

<style scoped>
div{
    font-size: 14px;
}
img {
    max-width: 100%;
}
</style>
