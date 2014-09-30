PIXI.FOVBlurXFilter = function()
{
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = {
        blurMax: {type: '1f', value: 1/300}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float blurMax;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '   vec4 sum = vec4(0.0);',
        '   float blur = blurMax * (abs(0.5 - vTextureCoord.x) + abs(0.5 - vTextureCoord.y)) / 2.0;',

        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;',

        '   gl_FragColor = sum;',
        '}'
    ];
};

PIXI.FOVBlurXFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.FOVBlurXFilter.prototype.constructor = PIXI.FOVBlurXFilter;

PIXI.FOVBlurYFilter = function()
{
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = {
        blurMax: {type: '1f', value: 1/300}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float blurMax;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '   vec4 sum = vec4(0.0);',
        '   float blur = blurMax * (abs(0.5 - vTextureCoord.x) + abs(0.5 - vTextureCoord.y)) / 2.0;',

        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;',

        '   gl_FragColor = sum;',
        '}'
    ];
};

PIXI.FOVBlurYFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.FOVBlurYFilter.prototype.constructor = PIXI.FOVBlurYFilter;

PIXI.FOVDisplacementFilter = function()
{
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = {
        distorsionMax: {type: '2f', value:{x:0.09, y:0.09}}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform vec2 distorsionMax;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '   vec2 offset = distorsionMax.xy * ((0.5 - vTextureCoord.x) + (0.5 - vTextureCoord.y));',

        '   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + offset.x, vTextureCoord.y + offset.y));',
        '}'
    ];
};

PIXI.FOVDisplacementFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.FOVDisplacementFilter.prototype.constructor = PIXI.FOVDisplacementFilter;

PIXI.FOVFilter = function()
{
    this.FOVBlurXFilter = new PIXI.FOVBlurXFilter();
    this.FOVBlurYFilter = new PIXI.FOVBlurYFilter();

    this.FOVDisplacementFilter = new PIXI.FOVDisplacementFilter();

    this.passes = [
      this.FOVDisplacementFilter,
      this.FOVBlurXFilter,
      this.FOVBlurYFilter
    ];
};

Object.defineProperty(PIXI.FOVFilter.prototype, 'blurMax', {
    get: function() {
        return this.FOVBlurXFilter.blurMax;
    },
    set: function(value) {
        this.FOVBlurXFilter.blurMax = this.FOVBlurYFilter.blurMax = value;
    }
});

Object.defineProperty(PIXI.FOVFilter.prototype, 'distorsionMax', {
    get: function() {
        return this.FOVDisplacementFilter.distorsionMax;
    },
    set: function(value) {
        this.FOVDisplacementFilter.distorsionMax = value;
    }
});
