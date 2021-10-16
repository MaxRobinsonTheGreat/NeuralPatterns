<template>
    <div>
        The <a href="https://en.wikipedia.org/wiki/Activation_function" target="_blank">activation function</a> is applied to every pixel after the filter. This allows for more complex behavior.
        <br><br>
        View this <a href="https://www.desmos.com/calculator/alquh4jv2n" target="_blank">desmos</a> graph for a breakdown of some common activation functions.
        <br><br>
        The input range is constrained by the filter weights. The final output is clipped between 0 and 1. 
    </div>

</template>

<script>

export default {
    name: 'ActivationWiki',
}
</script>

<style scoped>
div{
    font-size: 14px;
}
</style>
