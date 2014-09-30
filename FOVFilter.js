PIXI.FOVBlurXFilter = function()
{
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = {
      blurMax: {type: '1f', value: 1/200}
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

Object.defineProperty(PIXI.FOVBlurXFilter.prototype, 'blurMax', {
    get: function() {
        return this.uniforms.blurMax.value / (1/200);
    },
    set: function(value) {

        this.dirty = true;
        this.uniforms.blurMax.value = (1/200) * value;
    }
});

PIXI.FOVBlurYFilter = function()
{
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = {
      blurMax: {type: '1f', value: 1/200}
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

Object.defineProperty(PIXI.FOVBlurYFilter.prototype, 'blurMax', {
    get: function() {
        return this.uniforms.blurMax.value / (1/200);
    },
    set: function(value) {

        this.dirty = true;
        this.uniforms.blurMax.value = (1/200) * value;
    }
});

PIXI.FOVDistorsionFilter = function()
{
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = {
      distorsionMax: {type: '1f', value:0.2}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float distorsionMax;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '   vec2 distorsion = vec2( distorsionMax * (0.5 - vTextureCoord.x), distorsionMax * (0.5 - vTextureCoord.y) );',

        '   gl_FragColor = texture2D(uSampler, vTextureCoord.xy + distorsion.xy);',
        '   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);',
        '}'
    ];
};

PIXI.FOVDistorsionFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.FOVDistorsionFilter.prototype.constructor = PIXI.FOVDistorsionFilter;

Object.defineProperty(PIXI.FOVDistorsionFilter.prototype, 'distorsionMax', {
    get: function() {
        return this.uniforms.distorsionMax.value;
    },
    set: function(value) {

        this.dirty = true;
        this.uniforms.distorsionMax.value = value;
    }
});

PIXI.FOVFilter = function()
{
    this.FOVBlurXFilter = new PIXI.FOVBlurXFilter();
    this.FOVBlurYFilter = new PIXI.FOVBlurYFilter();

    this.FOVDistorsionFilter = new PIXI.FOVDistorsionFilter();

    this.passes = [
      this.FOVDistorsionFilter,
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
      return this.FOVDistorsionFilter.distorsionMax;
    },
    set: function(value) {
      this.FOVDistorsionFilter.distorsionMax = value;
    }
});
