<template>
    <div>
        Neural Patterns is a web toy built to run simple neural cellular automata (NCA) in the browser.
        These simple NCAs generate each frame by applying a single convolution and activation:
        <br><br>

        Convolution:
        <WikiSection><ConvolutionWiki/></WikiSection>
        Activation:
        <WikiSection><ActivationWiki/></WikiSection>
        <br>

        <a href="https://github.com/MaxRobinsonTheGreat/webgl-convolution" target="_blank">The code</a>
         is open source, feel free to expand on it. Powered with vue, webgl, and lots of coffee.
        <br><br>

    </div>

</template>

<script>
import WikiSection from '../Wiki/WikiSection';
import ActivationWiki from '../Wiki/ActivationWiki';
import ConvolutionWiki from '../Wiki/ConvolutionWiki';

export default {
    name: 'About',
    components: {
        WikiSection,
        ActivationWiki,
        ConvolutionWiki
    }
}
</script>

<style scoped>
div {
    text-align: left;
    font-size: 14px;
    margin: 3px;
}
</style>

