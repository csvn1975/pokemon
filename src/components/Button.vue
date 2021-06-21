<template>
  <div
    :class="class_name"
    @click = "onClick($event)"
    @mouseover="mouseover($event)"
  >
    <slot></slot>
    <span class="front">
      <slot></slot>
    </span>
    <span class="back"></span>
  </div>
</template>

<script>

export default {
    name: 'Button',
    props: {
         class_name: String,
         disabled: {
             type: Boolean,
             default: () => false
         }
    },

    /* senden signal to parent */
    methods: {

        onClick: function(e) {
          this.$emit('ClickAction', e);
        },

        mouseover: function(e) {
          this.$emit('mouseover', e);
        }
    },

};
</script>

<style>

:root {
    --bg-body: #1a1a2e;
    --bg-btn-primary: #00aeef;
    --bg-btn-success: #13ce66;
    --bg-btn-warn: #FFB702;
    --bg-btn-danger: #ff623d;
    --bg-btn-default: #919191;
    --color-btn: #fff;
}

.btn {
    --translate: -5px;
    position: relative;
    color: var(--color-btn);
    border: none;
    outline: none;

    padding: 12px 58px;
    font-size: 16px;
    font-weight: 600;

    cursor: pointer;
    background-color: transparent;
    
    display: inline-block;
    text-decoration: none;
    padding: 12px 58px;
    border-radius: 50px;
    transition: opacity 0.2s linear;

}

.btn-primary span {
    background-color: var(--bg-btn-primary);
}

.btn-warn span {
    background-color: var(--bg-btn-warn);
}

.btn-danger span {
    background-color: var(--bg-btn-danger);
}

.btn-success span {
    background-color: var(--bg-btn-success);
}

.btn-default span {
    background-color: var(--bg-btn-default);
}

.btn span {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    white-space: nowrap;
    clip-path: polygon(20px 0, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
}

.btn > span.front {
    padding: 12px 58px;
    transform: translate(var(--translate), var(--translate));
    transition: transform 0.2s ease-in-out;
    z-index: 0;
}

.btn > span.back{
    opacity: 0.6;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.btn:hover > span.front {
    transform: translate(
        calc(var(--translate) / 2),
        calc(var(--translate) / 2)
    );
}

.btn:active > span.front {
   transform: translate(
        calc(var(--translate) / 2),
        calc(var(--translate) / 2)
    );
}

</style>
