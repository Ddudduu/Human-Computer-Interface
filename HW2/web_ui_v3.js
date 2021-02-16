let WebUI = {}
WebUI.parser=math.parser();
let display="0";
let sample="";

WebUI.WidgetTypes = {
    UNDEFINED:      "undefind",
    TEXT:           "text",
    IMAGE:          "image",
    PUSH_BUTTON:    "push_button",
    TEXT_FIELD:     "text_field",
    SWITCH:         "switch",
    
    // add new widget types
    CONTAINER: "container",
    ROW: "row",
    COLUMN: "column",
    MY_PUSH_BUTTON: "my_push_button",
    CONTAINER2: "container2",
    CARD:"card",
    HELP: "help"
};

WebUI.Alignment = {
    // add alignment types
    CENTER: "center",
    LEFT: "left",
    RIGHT: "right",
    TOP: "top",
    BOTTOM: "bottom"
};

WebUI.widgets = [];
WebUI.focused_widget = null;
WebUI.dragged_widget = null;
WebUI.hovered_widget = null;

WebUI.is_mouse_dragging = false;       
WebUI.mouse_drag_start = {x:0, y:0};
WebUI.mouse_drag_prev = {x:0, y:0};

WebUI.app = null;

WebUI.initialize = function() {
    this.canvas = new fabric.Canvas("c", {
        backgroundColor: "#eee",
        hoverCursor: "default",
        selection: false,
        width: window.innerWidth,
        height: window.innerHeight
    });

    //
    $(document).keypress(function(event) {
        WebUI.handleKeyPress(event);
    });
    $(document).mousedown(function(event) {
        let p = {x: event.pageX, y: event.pageY};
        WebUI.handleMouseDown(p);
    });
    $(document).mouseup(function(event) {
        let p = {x: event.pageX, y: event.pageY};
        WebUI.handleMouseUp(p);
    });
    $(document).mousemove(function(event) {
        let p = {x: event.pageX, y: event.pageY};
        WebUI.handleMouseMove(p);
    });

    //
    WebUI.initWidgets();
    WebUI.initVisualItems();
    WebUI.layoutWhenResourceReady();
}

WebUI.initWidgets = function() {
    // initialize widgets
    WebUI.app=
      new WebUI.Row({
        children: [
            
            new WebUI.Container({
                padding:1,
                 desired_size: {width:600, height:130},
                horizontal_alignment:WebUI.Alignment.RIGHT,
                vertical_alignment:WebUI.Alignment.CENTER,
    
                children:[
                    new WebUI.Container2('rgb(0,0,0)',{
                    desired_size: {width :550, height: 70},
                    horizontal_alignment: WebUI.Alignment.LEFT,
                    vertical_alignment: WebUI.Alignment.TOP, 
                    children: [
                        new WebUI.Text(display,'rgb(0,0,0)')]
                    })
                ]
            }),
           

            new WebUI.Row({
               
                children:[
                    new WebUI.Column({
                        
                        children: [
                            new WebUI.Container({
                                padding:1,
                                desired_size:{width:110,height:40},
                                horizontal_alignment:WebUI.Alignment.RIGHT,
                                children:[
                                    new WebUI.Card('rgb(232,219,95)',"cross",{width:50,height:40})]
                        }),
                            new WebUI.Card('rgb(232,219,95)',"det",{width:50,height:40}),
                            new WebUI.Card('rgb(232,219,95)',"exp",{width:50,height:40}),
                            new WebUI.Card('rgb(232,219,95)',"n!",{width:40,height:40}),
                            new WebUI.Card('rgb(178,204,255)',"i",{width:40,height:40}),
                            new WebUI.Card('rgb(178,204,255)',"e",{width:40,height:40}),
                            new WebUI.Card('rgb(178,204,255)',"pi",{width:40,height:40}),
                            new WebUI.Help('rgb(90,174,255)',{width:100,height:40})
                           
                        ]
                    }),
                    new WebUI.Column({
                        children:[
                            new WebUI.Container({
                                padding:1,
                                desired_size:{width:110,height:40},
                                horizontal_alignment:WebUI.Alignment.RIGHT,
                                children:[
                                    new WebUI.Card('rgb(232,219,95)',"log",{width:50,height:40})]
                        }),
                        new WebUI.Card('rgb(232,219,95)',"ln",{width:50,height:40}),
                        new WebUI.Card('rgb(232,219,95)',"√",{width:50,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"==",{width:40,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"!=",{width:40,height:40}),
                        new WebUI.Card('rgb(178,204,255)',":",{width:40,height:40}),
                        new WebUI.Card('rgb(178,204,255)',";",{width:40,height:40})
                        ]
                    }),
                    new WebUI.Column({
                        children: [
                            new WebUI.Container({
                                padding:1,
                                desired_size:{width:110,height:40},
                                horizontal_alignment:WebUI.Alignment.RIGHT,
                                children:[
                                    new WebUI.Card('rgb(232,219,95)',"sin",{width:50,height:40})]
                        }),
                        new WebUI.Card('rgb(232,219,95)',"cos",{width:50,height:40}),
                        new WebUI.Card('rgb(232,219,95)',"tan",{width:50,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"<",{width:40,height:40}),
                        new WebUI.Card('rgb(178,204,255)',">",{width:40,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"<=",{width:40,height:40}),
                        new WebUI.Card('rgb(178,204,255)',">=",{width:40,height:40})
                        ]
                    }),
                    new WebUI.Column({
                        children:[
                            new WebUI.Container({
                                padding:1,
                                desired_size:{width:105,height:40},
                                horizontal_alignment:WebUI.Alignment.RIGHT,
                                children:[
                                new WebUI.Card('rgb(178,204,255)',"f",{width:44,height:40})]
                        }),
                        new WebUI.Card('rgb(178,204,255)',"g",{width:44,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"=",{width:44,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"x",{width:44,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"y",{width:44,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"z",{width:44,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"w",{width:44,height:40})
                        ]
                    }),

                    new WebUI.Column({
                        children:[
                            new WebUI.Container({
                               padding:1,
                                desired_size:{width:120,height:50},
                                horizontal_alignment:WebUI.Alignment.RIGHT,
                                children:[
                                    new WebUI.Card('rgb(178,204,255)',"(",{width:60,height:40})]
                        }),
                        new WebUI.Card('rgb(178,204,255)',")",{width:60,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"[",{width:60,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"]",{width:60,height:40}),
                        new WebUI.Card('rgb(255,90,90)',"AC",{width:90,height:40})
                        
                        ]
                    }),
                    new WebUI.Column({
                        children:[
                            new WebUI.Container({
                               padding:1,
                                desired_size:{width:130,height:50},
                                horizontal_alignment:WebUI.Alignment.RIGHT,
                                children:[
                                    new WebUI.Card('rgb(255,255,255)',"7",{width:70,height:40})]
                        }),
                        new WebUI.Card('rgb(255,255,255)',"8",{width:70,height:40}),
                        new WebUI.Card('rgb(255,255,255)',"9",{width:70,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"%",{width:60,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"^",{width:60,height:40})
                        
                        ]
                    }),

                    new WebUI.Column({
                        children:[
                            new WebUI.Container({
                               padding:1,
                                desired_size:{width:130,height:50},
                                horizontal_alignment:WebUI.Alignment.RIGHT,
                                children:[
                                    new WebUI.Card('rgb(255,255,255)',"4",{width:70,height:40})]
                        }),
                        new WebUI.Card('rgb(255,255,255)',"5",{width:70,height:40}),
                        new WebUI.Card('rgb(255,255,255)',"6",{width:70,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"+",{width:60,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"-",{width:60,height:40})
                        
                        ]
                    }),
                    new WebUI.Column({
                        children:[
                            new WebUI.Container({
                               padding:1,
                                desired_size:{width:130,height:50},
                                horizontal_alignment:WebUI.Alignment.RIGHT,
                                children:[
                                    new WebUI.Card('rgb(255,255,255)',"1",{width:70,height:40})]
                        }),
                        new WebUI.Card('rgb(255,255,255)',"2",{width:70,height:40}),
                        new WebUI.Card('rgb(255,255,255)',"3",{width:70,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"*",{width:60,height:40}),
                        new WebUI.Card('rgb(178,204,255)',"/",{width:60,height:40})
                        
                        ]
                    }),

                    new WebUI.Column({
                        children:[
                            new WebUI.Container({
                               padding:1,
                                desired_size:{width:130,height:50},
                                horizontal_alignment:WebUI.Alignment.RIGHT,
                                children:[
                                    new WebUI.Card('rgb(255,255,255)',"0",{width:70,height:40})]
                        }),
                        new WebUI.Card('rgb(255,255,255)',".",{width:30,height:40}),
                        new WebUI.Card('rgb(255,255,255)',",",{width:30,height:40}),
                        new WebUI.Card('rgb(255,255,255)',"←",{width:70,height:40}),
                        new WebUI.Card('rgb(106,188,100)',"EV",{width:130,height:40})
                        
                        ]
                    })

                ]
            }),
        ]
    });
}

//
WebUI.initVisualItems = function() {
    WebUI.widgets.forEach(widget => {
        widget.initVisualItems();
    });
}

WebUI.layoutWhenResourceReady = function() {
    let is_resource_loaded = true;
    for (let i in WebUI.widgets) {
        let widget = WebUI.widgets[i];
        if (!widget.is_resource_ready) {
            is_resource_loaded = false;
            break;
        }
    }

    if (!is_resource_loaded) {
        setTimeout(arguments.callee, 50);
    }
    else {
        WebUI.app.layout();
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleKeyPress = function(event) {
    let is_handled = false;

    if (WebUI.focused_widget) {
        is_handled = WebUI.focused_widget.handleKeyPress(event) || is_handled;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleMouseDown = function(window_p) {
    let is_handled = false;

    if (WebUI.isInCanvas(window_p)) {
        let canvas_p = WebUI.transformToCanvasCoords(window_p);        

        WebUI.is_mouse_dragging = true;
        WebUI.mouse_drag_start = canvas_p;
        WebUI.mouse_drag_prev = canvas_p;

        let widget = WebUI.findWidgetOn(canvas_p);
        if (widget) {
            WebUI.focused_widget = widget;    

            if (widget.is_draggable) {
                WebUI.dragged_widget = widget;
            }
            else {
                WebUI.dragged_widget = null;
            }

            is_handled = widget.handleMouseDown(canvas_p) || is_handled;
        }
        else {
            WebUI.focused_widget = null;
            WebUI.dragged_widget = null;
        }
    }
    else {
        WebUI.is_mouse_dragging = false;
        WebUI.mouse_drag_start = {x:0, y:0};
        WebUI.mouse_drag_prev = {x:0, y:0};

        WebUI.focused_widget = null;
        WebUI.dragged_widget = null;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleMouseMove = function(window_p) {
    let canvas_p = WebUI.transformToCanvasCoords(window_p);
    let is_handled = false;

    let widget = WebUI.findWidgetOn(canvas_p);
    if (widget != WebUI.hovered_widget) {
        if (WebUI.hovered_widget != null) {
            is_handled = WebUI.hovered_widget.handleMouseExit(canvas_p) || is_handled;
        }
        if (widget != null) {
            is_handled = widget.handleMouseEnter(canvas_p) || is_handled;
        }
        WebUI.hovered_widget = widget;
    }
    else {
        if (widget) {
            is_handled = widget.handleMouseMove(canvas_p) || is_handled;
        }
    }

    if (WebUI.is_mouse_dragging) {
        if (WebUI.dragged_widget != null) {
            let tx = canvas_p.x - WebUI.mouse_drag_prev.x;
            let ty = canvas_p.y - WebUI.mouse_drag_prev.y;
            WebUI.dragged_widget.translate({x: tx, y: ty});

            is_handled = true;
        }
        WebUI.mouse_drag_prev = canvas_p;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleMouseUp = function(window_p) {
    let is_handled = false;
    let canvas_p = WebUI.transformToCanvasCoords(window_p);

    let widget  = WebUI.findWidgetOn(canvas_p);
    if (widget) {
        is_handled = widget.handleMouseUp(canvas_p) || is_handled;
    }

    if (WebUI.is_mouse_dragging) {
        WebUI.is_mouse_dragging = false;
        WebUI.mouse_drag_start = {x:0, y:0};
        WebUI.mouse_drag_prev = {x:0, y:0};

        WebUI.dragged_widget = null;
        
        is_handled = true;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.transformToCanvasCoords = function(window_p) {
    let rect = WebUI.canvas.getElement().getBoundingClientRect();
    let canvas_p = {
        x : window_p.x - rect.left,
        y : window_p.y - rect.top
    };
    return canvas_p;
}

WebUI.isInCanvas = function(window_p) {
    let rect = WebUI.canvas.getElement().getBoundingClientRect();
    if (window_p.x >= rect.left && 
        window_p.x < rect.left + rect.width &&
        window_p.y >= rect.top && 
        window_p.y < rect.top + rect.height) {
        return true;
    }
    else {
        return false;
    }
}

WebUI.findWidgetOn = function(canvas_p) {
    let x = canvas_p.x;
    let y = canvas_p.y;

    for (let i=0; i < this.widgets.length; i++) {
        let widget = this.widgets[i];

        if (x >= widget.position.left &&
            x <= widget.position.left + widget.size.width &&
            y >= widget.position.top &&
            y <= widget.position.top + widget.size.height) {
            return widget;
        }               
    }
    return null;
}

WebUI.maxSize = function(size1, size2) {
    // implement this
    let max_size={width: 0, height: 0};

    max_size.width = (size1.width > size2.width) ? size1.width : size2.width;
    max_size.height = (size1.height > size2.height) ? size1.height : size2.height;

    return max_size;
}

WebUI.minSize = function(size1, size2) {
    let min_size={width: 0, height: 0};
    min_size.width=(size1.width < size2.width) ? size1.width : size2.width;
    min_size.height=(size1.height < size2.height) ? size1.height : size2.height;

    return min_size;
}


//
WebUI.Widget = function(properties) {
    this.type = WebUI.WidgetTypes.UNDEFINED;
    
    this.is_draggable = false;
    this.is_movable = true;

    //
    this.parent = null;
    this.children = [];
    
    //
    this.position = {left: 0, top: 0};
    this.size = {width: 0, height: 0};

    //
    this.visual_items = [];
    this.is_resource_ready = false;

    //
    WebUI.widgets.push(this);
    
    if(properties != undefined){
        for(let name in properties){
            let value = properties[name];
            if(name == 'children'){
                value.forEach(child=>{
                    child.parent=this;
                    this.children.push(child);
                });
        }
        else{
            this[name]=value;
        }
    }
}

    //
    this.setDefaultProperty('desired_size', {width: 0, height: 0});
    this.setDefaultProperty('horizontal_alignment', WebUI.Alignment.CENTER);
    this.setDefaultProperty('vertical_alignment', WebUI.Alignment.TOP);
    this.setDefaultProperty('fill_color', 'white');
    this.setDefaultProperty('stroke_color', 'black');
    this.setDefaultProperty('stroke_width', 1);
    this.setDefaultProperty('text_align', 'left');
    this.setDefaultProperty('text_color', 'black');
    this.setDefaultProperty('font_family', 'System');
    this.setDefaultProperty('font_size', 20);
    this.setDefaultProperty('font_weight', 'bold');
    this.setDefaultProperty('padding', 5);
    this.setDefaultProperty('margin', 10);
}

WebUI.Widget.prototype.setDefaultProperty = function(name, value) {
    if (this[name] == undefined) {
        this[name] = value;
    }
}

WebUI.Widget.prototype.getBoundingRect = function() {
    return {
        left:   this.position.left, 
        top:    this.position.top,
        width:  this.size.width,
        height: this.size.height
    };
}

WebUI.Widget.prototype.layout = function() {
    this.measure();
    this.arrange(this.position);
}

WebUI.Widget.prototype.measure = function() {
    if(this.children.length>0){
        this.size_children={width: 0, height: 0};
        this.children.forEach(child => {
            let size_child=child.measure();
            this.size_children=this.extendSizeChildren(this.size_children,size_child);
        });
        this.size=WebUI.maxSize(this.desired_size,this.size_children);
    }
    else{
        this.size.width += this.padding*2;
        this.size.height += this.padding*2;
    }
    return this.size;
}
 
WebUI.Widget.prototype.arrange = function(position) {
    this.moveTo(position);
    this.visual_items.forEach(item => {WebUI.canvas.add(item); });

    if(this.children.length>0){
        let left_spacing =0, top_spacing=0;

        if(this.size.width > this.size_children.width){
            let room_width = this.size.width - this.size_children.width;

            if(this.horizontal_alignment == WebUI.Alignment.LEFT)
            left_spacing=this.padding;
            else if (this.horizontal_alignment == WebUI.Alignment.CENTER)
            left_spacing = this.padding + room_width/2.0;
            else if (this.horizontal_alignment == WebUI.Alignment.RIGHT)
            left_spacing = this.padding + room_width;
        }

        if(this.size.height > this.size_children.height){
            let room_height = this.size.height - this.size_children.height;

            if(this.vertical_alignment == WebUI.Alignment.TOP)
            top_spacing = this.padding;
            else if(this.vertical_alignment == WebUI.Alignment.CENTER)
            top_spacing = this.padding + room_height/2.0;
            else if(this.vertical_alignment == WebUI.Alignment.BOTTOM)
            top_spacing = this.padding + room_height;
        }

        let next_position={left: position.left + left_spacing,top : position.top+top_spacing};
        this.children.forEach(child => {
            child.arrange(next_position);
            next_position=this.calcNextPosition(next_position,child.size);
        });
    }
}

WebUI.Widget.prototype.extendSizeChildren = function(size, child_size) {
    if (size.width < child_size.width)      size.width = child_size.width;
    if (size.height < child_size.height)    size.height = child_size.height;

    return size;
}

WebUI.Widget.prototype.calcNextPosition = function(position, size) {
    let next_left = position.left + size.width;
    let next_top = position.top;

    return {left: next_left, top: next_top};
}


WebUI.Widget.prototype.initVisualItems = function() {
    this.is_resource_ready = true;
    return true;
}

WebUI.Widget.prototype.moveTo = function(p) {
    if(!this.is_movable)
    {
        return;
    }

    let tx = p.left - this.position.left;
    let ty = p.top - this.position.top;

    this.translate({x: tx, y: ty});
}

WebUI.Widget.prototype.translate = function(v) {
    if(!this.is_movable)
    {
        return;
    }

    this.position.left += v.x;
    this.position.top += v.y;

    this.visual_items.forEach(item => {
        item.left += v.x;
        item.top += v.y;
    });

    this.children.forEach(child_widget => {
        child_widget.translate(v);
    });
}

WebUI.Widget.prototype.destroy = function() {
    if (this == WebUI.focused_widget) WebUI.focused_widget = null;
    if (this == WebUI.dragged_widget) WebUI.dragged_widget = null;
    if (this == WebUI.hovered_widget) WebUI.hovered_widget = null;

    this.visual_items.forEach(item => {
        WebUI.canvas.remove(item);
    });
    this.visual_items = [];
    
    let index = WebUI.widgets.indexOf(this);
    if(index > -1)
    {
        WebUI.widgets.splice(index, 1);
    }

    this.children.forEach(child_widget => {
        child_widget.destroy();
    });
    this.children = [];

}

WebUI.Widget.prototype.handleKeyPress = function(event) {
    return false;
}

WebUI.Widget.prototype.handleMouseDown = function(canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseMove = function(canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseUp = function(canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseEnter = function(canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseExit = function(canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleResize = function() {
    return false;
}


//
WebUI.Container = function(properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.CONTAINER;
}


WebUI.Container.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Container.prototype.constructor = WebUI.Container;

WebUI.Container.prototype.extendSizeChildren = function(size, child_size) {
    if(size.width < child_size.width)
    size.width = child_size.width;
    if(size.height < child_size.height) 
    size.height = child_size.height;
    return size;
}

WebUI.Container.prototype.calcNextPosition = function(position, size) {
    let next_left = position.left;
    let next_top = position.top;
    return {left: next_left, top: next_top};
}

//new container
WebUI.Container2 = function(color,properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.CONTAINER;
    this.fill=color;
}


WebUI.Container2.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Container2.prototype.constructor = WebUI.Container2;

WebUI.Container2.prototype.extendSizeChildren = function(size, child_size) {
    if(size.width < child_size.width)
    size.width = child_size.width;
    if(size.height < child_size.height) 
    size.height = child_size.height;
    return size;
}

WebUI.Container2.prototype.calcNextPosition = function(position, size) {
    let next_left = position.left;
    let next_top = position.top;
    return {left: next_left, top: next_top};
}


WebUI.Container2.prototype.initVisualItems = function() {
    let boundary = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false,
        rx:10,
        ry:10
    });

    this.size = this.desired_size;

    //
    this.visual_items.push(boundary);
    
    this.is_resource_ready = true;
}

//
WebUI.Column = function(properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.COLUMN;
}

WebUI.Column.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Column.prototype.constructor = WebUI.Column;

WebUI.Column.prototype.extendSizeChildren = function(size, child_size) {
    size.width += child_size.width;
    if(size.height < child_size.height)size.height = child_size.height;
    return size;
}

WebUI.Column.prototype.calcNextPosition = function(position, size) {
    let next_left = position.left + size.width;
    let next_top = position.top;
    return {left: next_left,top: next_top};
}


//
WebUI.Row = function(properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.ROW;
}

WebUI.Row.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Row.prototype.constructor = WebUI.Row;

WebUI.Row.prototype.extendSizeChildren = function(size, child_size) {
    if(size.width < child_size.width)
    size.width = child_size.width;
    size.height += child_size.height;
    return size;
}

WebUI.Row.prototype.calcNextPosition = function(position, size) {
    let next_left = position.left;
    let next_top = position.top + size.height;
    return {left: next_left,top: next_top};
}


//☆★☆★color 인자 추가!!☆★☆★
WebUI.Text = function(label, color,properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.TEXT;
    this.label = label;
    this.text_color=color;
}

WebUI.Text.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Text.prototype.constructor = WebUI.Text;

WebUI.Text.prototype.initVisualItems = function() {
    let text = new fabric.Text(this.label, {
        left:       this.position.left,
        top:        this.position.top,
        selectable: false,
        fontFamily: this.font_family,
        fontSize:   this.font_size,
        fontWeight: this.font_weight,
        textAlign:  this.text_align,
        stroke:     this.text_color,
        fill:       this.text_color,
    });

    //
    let bound = text.getBoundingRect();
    this.position.left = bound.left;
    this.position.top = bound.top;
    this.size.width = bound.width;
    this.size.height = bound.height;

    //
    this.visual_items.push(text);
    this.is_resource_ready = true;
}

WebUI.Text.prototype.setLabel = function(new_label) {
    let text = this.visual_items[0];
    text.set('text', new_label);

    this.label = new_label;

    WebUI.canvas.requestRenderAll();
}

//
WebUI.Image = function(path, desired_size, properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.IMAGE;
    this.path = path;
    this.desired_size = desired_size;
}

WebUI.Image.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Image.prototype.constructor = WebUI.Image;

WebUI.Image.prototype.initVisualItems = function() {
    let widget = this;

    fabric.Image.fromURL(this.path, function(img) {
        console.log("Image[" + widget.path + "] is loaded");

        if (widget.desired_size != undefined) {
            img.scaleToWidth(widget.desired_size.width);
            img.scaleToHeight(widget.desired_size.height);
            widget.size = widget.desired_size;
        }
        else {
            widget.size = {width: img.width, height: img.height};
        }

        img.set({
            left: widget.position.left,
            top: widget.position.top,
            selectable: false,
        });

        widget.visual_items.push(img);
        widget.is_resource_ready = true;
    });
}

//
WebUI.TextField = function(label, desired_size, properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.TEXT_FIELD;
    this.label = label;
    this.desired_size = desired_size;

    this.stroke_width = 5;
}

WebUI.TextField.prototype = Object.create(WebUI.Widget.prototype);
WebUI.TextField.prototype.constructor = WebUI.TextField;

WebUI.TextField.prototype.initVisualItems = function() {
    let boundary = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false
    });

    let textbox = new fabric.Textbox(this.label, {
            left:       this.position.left + this.margin,
            selectable: false,
            fontFamily: this.font_family,
            fontSize:   this.font_size,
            fontWeight: this.font_weight,
            textAlign:  this.text_align,
            stroke:     this.text_color,
            fill:       this.text_color,
        }
    );

    let bound = textbox.getBoundingRect();
    textbox.top = this.position.top + this.desired_size.height/2 - bound.height/2;

    this.size = this.desired_size;

    //
    this.visual_items.push(boundary);
    this.visual_items.push(textbox);
    this.is_resource_ready = true;
}

WebUI.TextField.prototype.handleMouseDown = function(canvas_p) {
    let textbox = this.visual_items[1];        
    textbox.enterEditing();

    return true;
}

WebUI.TextField.prototype.handleKeyPress = function(event) {
    let boundary = this.visual_items[0];
    let textbox = this.visual_items[1];        

    let new_label = textbox.text;
    let old_label = this.label;
    this.label = new_label;

    if (event.keyCode == 13) {
        let text_enter_removed = new_label.replace(/(\r\n|\n|\r)/gm, "");
        textbox.text = text_enter_removed;
        this.label = text_enter_removed;
        
        if (textbox.hiddenTextarea != null) {
            textbox.hiddenTextarea.value = text_enter_removed;
        }

        textbox.exitEditing();

        return true;    
    }

    if (old_label != new_label && old_label.length < new_label.length) {
        let canvas = document.getElementById("c");
        let context = canvas.getContext("2d");
        context.font = this.font_size.toString() + "px " + this.font_family;

        let boundary_right = boundary.left + boundary.width - this.margin;
        let text_bound = textbox.getBoundingRect();
        let text_width = context.measureText(new_label).width;
        let text_right = text_bound.left + text_width;

        if (boundary_right < text_right) {
            textbox.text = old_label;
            this.label = old_label;
            
            if (textbox.hiddenTextarea != null) {
                textbox.hiddenTextarea.value = old_label;
            }

            return true;
        }
    }
    
    return false;
}

//
WebUI.PushButton = function(label, desired_size, properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.PUSH_BUTTON;
    this.label = label;       
    this.desired_size = desired_size;

    this.is_pushed = false;
}

WebUI.PushButton.prototype = Object.create(WebUI.Widget.prototype);
WebUI.PushButton.prototype.constructor = WebUI.PushButton;

WebUI.PushButton.prototype.initVisualItems = function() {
    let background = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false
    });

    let text = new fabric.Text(this.label, {
        left: this.position.left,
        top: this.position.top,
        selectable: false,
        fontFamily: this.font_family,
        fontSize:   this.font_size,
        fontWeight: this.font_weight,
        textAlign:  this.text_align,
        stroke:     this.text_color,
        fill:       this.text_color,
    });

    let bound = text.getBoundingRect();
    text.left = this.position.left + this.desired_size.width/2 - bound.width/2;
    text.top = this.position.top + this.desired_size.height/2 - bound.height/2;

    this.size = this.desired_size;

    //
    this.visual_items.push(background);
    this.visual_items.push(text);
    this.is_resource_ready = true;
}

WebUI.PushButton.prototype.handleMouseDown = function() {
    if (!this.is_pushed) {
        this.translate({x:0, y:5});
        this.is_pushed = true;

        if (this.onPushed != undefined) {
            this.onPushed.call(this);
        }

        return true;    
    }
    else {
        return false;
    }
}

WebUI.PushButton.prototype.handleMouseUp = function() {
    if (this.is_pushed) {
        this.translate({x:0, y:-5});
        this.is_pushed = false;
        return true;
    }
    else {
        return true;
    }
}

WebUI.PushButton.prototype.handleMouseEnter = function() {
    this.visual_items[0].set('strokeWidth', 3);
    return true;
}

WebUI.PushButton.prototype.handleMouseExit = function() {
    this.visual_items[0].set('strokeWidth', 1);

    if (this.is_pushed) {
        this.translate({x:0, y:-5});
        this.is_pushed = false;
    }

    return true;
}


//My_Push_Button
WebUI.MyPushButton = function(label, desired_size,properties){
    WebUI.PushButton.call(this,label,desired_size,properties);

    this.type=WebUI.WidgetTypes.MY_PUSH_BUTTON;
    this.label=label;
    this.desired_size=desired_size;
    this.onPushed=WebUI.MyPushButton.prototype.handleButtonPushed;
   
}

WebUI.MyPushButton.prototype=Object.create(WebUI.PushButton.prototype);
WebUI.MyPushButton.prototype.constructor=WebUI.MyPushButton;

WebUI.MyPushButton.prototype.initVisualItems = function() {
    let background = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false
    });

    let text = new fabric.Text(this.label, {
        left: this.position.left,
        top: this.position.top,
        selectable: false,
        fontFamily: this.font_family,
        fontSize:   this.font_size,
        fontWeight: this.font_weight,
        textAlign:  this.text_align,
        stroke:     this.text_color,
        fill:       this.text_color,
    });

    let bound = text.getBoundingRect();
    text.left = this.position.left + this.desired_size.width/2 - bound.width/2;
    text.top = this.position.top + this.desired_size.height/2 - bound.height/2;

    this.size = this.desired_size;

    //
    this.visual_items.push(background);
    this.visual_items.push(text);
    this.is_resource_ready = true;
}


WebUI.MyPushButton.prototype.handleButtonPushed=function(){

    if(display=='0')
    display='';

    
    if (display.length>51)
    {
        if(display.includes('\n')){}
        else
        {display+='\n';}       
        
    }
    

if(this.visual_items[1].text=='EV'){
    try{
        if(display.includes('ln')){
            display=display.replace("ln","log");
            
        }

        let result=WebUI.parser.eval(display).toString();
        display=result;
        let tokens=result.split(' ');

        if(tokens[0]=='function'){
            display=tokens[0];
        }
       
       WebUI.initialize();
       
        display='0';
    }
    catch(e){
        display='0';

        if(display!='function'){
            display=e.message;
            WebUI.initialize();
            
        }
    }

    
}

else {
    
    if(this.visual_items[1].text=='AC'){
        display="0";
        
        WebUI.initialize();
        
    }
    
    else if(this.visual_items[1].text=='←'){
        display=display.substring(0,(display.length)-1);
        WebUI.initialize();
       
    }
    
    else {
        if(this.visual_items[1].text=='√'){
            display+="sqrt";
        }
        
        else if(this.visual_items[1].text=='n!'){
            
           display=math.factorial(parseInt(display)).toString();
          
        }

        else{
        display+=this.visual_items[1].text;}
        
        WebUI.initialize();
    }
}
return true;
}


WebUI.Card = function(color,label,desired_size,properties){
    WebUI.MyPushButton.call(this,label,desired_size,properties);
    this.type=WebUI.WidgetTypes.CARD;

    this.label=label;
    this.fill_color=color;
    this.stroke_color=color;
    this.desired_size=desired_size;
     
}

WebUI.Card.prototype=Object.create(WebUI.MyPushButton.prototype);
WebUI.Card.prototype.constructor=WebUI.Card;

WebUI.Card.prototype.initVisualItems = function() {
    let background = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false,
        rx:10,
        ry:10
    });

    background.setShadow({
        color:'rgb(140,140,140)',
        blur:3,
        offsetX:4,
        offsetY:4,
        opacity:0.5,
    });


    let text = new fabric.Text(this.label, {
        left: this.position.left,
        top: this.position.top,
        selectable: false,
        fontFamily:'Trebuchet MS',
        fontSize:   this.font_size,
        fontWeight: this.font_weight,
        textAlign:  this.text_align,
        stroke:     this.text_color,
        fill:       this.text_color,
    });

    let bound = text.getBoundingRect();
    text.left = this.position.left + this.desired_size.width/2 - bound.width/2;
    text.top = this.position.top + this.desired_size.height/2 - bound.height/2;

    this.size = this.desired_size;

    //
    this.visual_items.push(background);
    this.visual_items.push(text);
    this.is_resource_ready = true;
}

WebUI.Help = function(color,desired_size,properties){
    WebUI.Widget.call(this,desired_size,properties);
    this.type=WebUI.WidgetTypes.HELP;

    this.label="사용 방법";
    this.fill_color=color;
    this.stroke_color=color;
    this.desired_size=desired_size;
    this.on=false;
}

WebUI.Help.prototype=Object.create(WebUI.Widget.prototype);
WebUI.Help.prototype.constructor=WebUI.Help;

WebUI.Help.prototype.initVisualItems = function() {
    let background = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false,
        rx:10,
        ry:10
    });

    background.setShadow({
        color:'rgb(140,140,140)',
        blur:3,
        offsetX:4,
        offsetY:4,
        opacity:0.5,
    });


    let text = new fabric.Text(this.label, {
        left: this.position.left,
        top: this.position.top,
        selectable: false,
        fontFamily:'돋움',
        fontSize:   this.font_size,
        fontWeight: this.font_weight,
        textAlign:  this.text_align,
        stroke:     this.text_color,
        fill:       this.text_color,
    });

    let bound = text.getBoundingRect();
    text.left = this.position.left + this.desired_size.width/2 - bound.width/2;
    text.top = this.position.top + this.desired_size.height/2 - bound.height/2;

    this.size = this.desired_size;

    //
    this.visual_items.push(background);
    this.visual_items.push(text);
    this.is_resource_ready = true;
}


WebUI.Help.prototype.handleMouseDown = function() {

    if(this.on) {
      //제거 
      var objects=WebUI.canvas.getObjects();
      WebUI.canvas.remove(objects[objects.length-2]);
      WebUI.canvas.remove(objects[objects.length-1]);
     
      this.on=false;
    }

    else {
         //생성
         let graph= new fabric.Rect({
           left: 440,
           top:190,
           width:400,
           height:420,
           fill: 'rgb(255,255,255)',
           stroke: 'rgb(255,255,255)',
           strokeWidth:3,
           selectable:false,
           rx:10,
           ry:10
       });
       
       WebUI.canvas.add(graph);    
       
     let sample='cross : cross([1,1,0],[0,1,1]) \n           cross([[1,2,3]],[[4],[5],[6]]) \n\ndet    : det([-1,2;3,4]) \n\nexp   : exp(2)\n           exp([1,2,3])\n\nn!      : 숫자 누르고 n! 누르기            \n\nlog     : log(10) \nln       : ln(e) \n\n√        : √(9) \nsin cos tan : sin(30), cos(pi), tan(120)';

       let text = new fabric.Text(sample, {
        left: 445,
        top: 200,
        selectable: false,
        fontFamily:'Trebuchet MS',
        fontSize:   this.font_size,
        fontWeight: this.font_weight,
        textAlign:  this.text_align,
        stroke:     this.text_color,
        fill:       this.text_color,
    });

    WebUI.canvas.add(text);
    
       this.on=true;
    }

    return true;
}

//
WebUI.Switch = function(is_on, desired_size, properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.SWITCH;
    this.is_on = is_on;
    this.desired_size = desired_size;
}

WebUI.Switch.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Switch.prototype.constructor = WebUI.Switch;

WebUI.Switch.prototype.initVisualItems = function() {
    let radius = this.desired_size.width / 4.0;
    let cx = radius * 2.0;
    let cy = radius;

    let center_left = {x: cx - radius, y: cy};
    let center_right = {x: cx + radius, y: cy};

    let theta_range = Math.PI;
    let num_pts = 10;
    let dt = theta_range / (num_pts-1);

    let theta0_left = Math.PI / 2.0;
    let theta1_left = theta0_left + theta_range;
    let theta0_right = -Math.PI / 2.0;
    let theta1_right = theta0_right + theta_range;

    let p0_left = {
        x: center_left.x + Math.cos(theta0_left) * radius,
        y: center_left.y + Math.sin(theta0_left) * radius
    };
    let p1_left = {
        x: center_left.x + Math.cos(theta1_left) * radius,
        y: center_left.y + Math.sin(theta1_left) * radius
    };

    let p0_right = {
        x: center_right.x + Math.cos(theta0_right) * radius,
        y: center_right.y + Math.sin(theta0_right) * radius
    };
    let p1_right = {
        x: center_right.x + Math.cos(theta1_right) * radius,
        y: center_right.y + Math.sin(theta1_right) * radius
    };

    //
    let path_command = "";
    path_command += "M " + p0_left.x + " " + p0_left.y + " ";

    for (let i=0; i < num_pts; i++) {
        let theta = theta0_left + dt * i;
        let p = {
            x: center_left.x + Math.cos(theta) * radius,
            y: center_left.y + Math.sin(theta) * radius
        };
        path_command += "L " + p.x + " " + p.y + " ";
    }

    for (let i=0; i < num_pts; i++) {
        let theta = theta1_left + dt * i;
        let p = {
            x: center_right.x + Math.cos(theta) * radius,
            y: center_right.y + Math.sin(theta) * radius
        };
        path_command += "L " + p.x + " " + p.y + " ";
    }

    path_command += "L " + p0_left.x + " " + p0_left.y + " z";

    //
    let boundary = new fabric.Path(path_command, {
        selectable:     false,
        left:           this.position.left,
        top:            this.position.top,
        stroke:         (this.is_on? 'rgb(48, 209, 88)' : 'rgb(142, 142, 147)'),
        strokeWidth:    2,
        fill:           (this.is_on? 'rgb(48, 209, 88)' : 'rgb(142, 142, 147)'),
    });

    //
    let button_radius = radius * 0.9;
    let button = new fabric.Circle({
        selectable:     false,
        radius:         button_radius,
        left:           this.position.left + (this.is_on? center_right.x - button_radius : center_left.x - button_radius),
        top:            this.position.top + (center_left.y - button_radius),
        stroke:         (this.is_on? 'rgb(48, 209, 88)' : 'rgb(142, 142, 147)'),
        strokeWidth:    3,
        fill:           'white',
    });

    //
    let bound = boundary.getBoundingRect();
    this.size = {width: bound.width, height: bound.height};

    //
    this.visual_items.push(boundary);
    this.visual_items.push(button);
    this.is_resource_ready = true;
}

WebUI.Switch.prototype.handleMouseDown = function() {
    if (this.is_on) {
        this.switchOff();
    }
    else {
        this.switchOn();
    }

    return true;
}

WebUI.Switch.prototype.switchOn = function() {
    let boundary = this.visual_items[0];
    let button = this.visual_items[1];

    let radius = this.size.width / 4.0;
    let button_radius = radius * 0.9;

    let cx = this.position.left + radius * 2.0, cy = this.position.top + radius;
    let center_right = {x: cx + radius, y: cy};

    boundary.set('stroke', 'rgb(48, 209, 88)');
    boundary.set('fill', 'rgb(48, 209, 88)');
    button.set('stroke', 'rgb(48, 209, 88)');

    button.animate('left', center_right.x - button_radius, {
        onChange: WebUI.canvas.renderAll.bind(WebUI.canvas),
        duration: 100,
        easing: fabric.util.ease.easeOutBounce,
    });

    this.is_on = true;
}

WebUI.Switch.prototype.switchOff = function() {
    let boundary = this.visual_items[0];
    let button = this.visual_items[1];

    let radius = this.size.width / 4.0 * 0.9;
    let button_radius = radius * 0.9;

    let cx = this.position.left + radius * 2.0, cy = this.position.top + radius;
    let center_left = {x: cx - radius, y: cy};

    boundary.set('stroke', 'rgb(142, 142, 147)');
    boundary.set('fill', 'rgb(142, 142, 147)');
    button.set('stroke', 'rgb(142, 142, 147)');

    button.animate('left', center_left.x - button_radius, {
        onChange: WebUI.canvas.renderAll.bind(WebUI.canvas),
        duration: 100,
        easing: fabric.util.ease.easeOutBounce,
    });

    this.is_on = false;
}


//
$(document).ready(function() {    
    WebUI.initialize();
});

