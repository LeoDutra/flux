/*
 * Flux JavaScript Library
 * Copyright (c) 2010 Leonardo Dutra Constancio
 * MIT License (http://jsflux.googlecode.com/svn/trunk/mit-license.txt)
 */

flux.Object2D = function() {
    if (this instanceof flux.Object2D) {
        this._children = [];
        this.setIntensity(1);
    }
};

flux.Object2D.prototype = {

    x: 0,
    y: 0,
    rotation: 0,
    name: '',
    hidden: false,
    _parent: null,
    _children: null,
    _intensity: 1,

    setXY: function(x, y) {
        this.x = x;
        this.y = y;
    },

    getGlobalXY: function() {
        var x = this.x;
        var y = this.y;
        var o = this._parent;
        while (o) {
            x += o.x;
            y += o.y;
            o = o._parent;
        }
        return new flux.V2(x, y);
    },

    setRotationAngle: function(angle) {
        this.rotation = 6.283185307179586 * angle / 360; // 6.283185307179586 = Math.PI * 2;
    },

    getRotationAngle: function() {
        return this.rotation * 360 / 6.283185307179586; // 6.283185307179586 = Math.PI * 2;
    },

    setIntensity: function(intensity) {
        // MUST avoid NaN
        this._intensity = intensity < 1 ? 0 < intensity ? intensity : 0 : 1;
    },

    getIntensity: function() {
        return this._intensity;
    },

    scale: function(v2, recursive) {
        //if(recursive)
        //{
        //    var children = this._children;
        //    var L = children.length;
        //    for(var i = 0; i < L; i++)
        //    {
        //        children[i].scale(v2, recursive);
        //    }
        //}
    },

    getBounds: function(recursive) // TODO
    {
        //var rect = arguments[1] || new flux.Rectangle(0, 0, 0, 0);
        //if(recursive)
        //{
        //    var cache;
        //    var i = (cache = this._children).length;
        //    while(i--)
        //    {
        //        cache[i].getBounds(recursive, rect, 1/*its not origin*/);
        //    }
        //    if(arguments[2]/*its origin?*/ && rect.isEmpty())
        //    {
        //        rect.x = rect.y = 0;
        //    }
        //}
        //return rect;
    },

    getRoot: function() {
        var o = this._parent;
        if (o) {
            while (o._parent) {
                o = o._parent;
            }
        }
        return o;
    },

    getParent: function() {
        return this._parent;
    },

    getChild: function(index) {
        return this._children[index];
    },

    getChildByName: function(name) {
        if (name) {
            var children = this._children;
            var i = children.length;
            while (i--) {
                if (children[i].name === name) return i;
            }
        }
        return null;
    },

    getChildIndex: function(child) {
        return this._children.indexOf(child);
    },

    getNumChildren: function() {
        return this._children.length;
    },

    addChild: function(child) {
        if (child instanceof flux.Object2D) {
            child.remove();
            (child._parent = this)._children.push(child);
        }
    },

    addChildAt: function(child, index) {

        //if( typeof index === 'number' && -1 < (index >>= 0) && child instanceof flux.Object2D)
        if (-1 < parseInt(index, 10) && child instanceof flux.Object2D) {
            child.remove();
            //var children = this._children;
            //if (index < children.length)
            //{
            //    children.splice(index, 0, child);
            //}
            //else {
            //    children[children.length] = child;
            //}
            this._children.splice(index, 0, child);
            child._parent = this;
        }
    },

    remove: function() {
        if (this._parent) this._parent.removeChild(this);
    },

    removeChild: function(child) {
        var i = this._children.indexOf(child);
        if (i !== -1) {
            this._children.splice(i, 1)[0]._parent = null;
        }
    },

    removeChildAt: function(index) {
        if (-1 < index) {
            if (index = this._children.splice(index, 1)[0]) index._parent = null;
        }
    },

    removeAll: function() {
        var children = this._children;
        var i = children.length;
        while (i--) {
            children[i]._parent = null; // SHALL NOT use "delete"
        }
        this._children = [];
    },

    setChildIndex: function(child, index) {
        if (child && child._parent === this) this.addChildAt(child, index);
    },

    swapChildren: function(child, anotherChild) {
        var children = this._children;
        if ((child = children.indexOf(child)) !== -1 && (anotherChild = children.indexOf(anotherChild)) !== -1) {
            child = children[child];
            children[child] = children[anotherChild];
            children[anotherChild] = child;
        }
    },

    swapChildrenAt: function(index, anotherIndex) {
        var children = this._children;
        var length = children.length;
        if (-1 < index && index < length && -1 < anotherIndex && anotherIndex < length) {
            length = children[index];
            children[index] = children[anotherIndex];
            children[anotherIndex] = length;
        }
    }
};