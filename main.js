var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 6

autoSetCanvasSize(canvas)

listenToUser(canvas)

red.onclick = function () {
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function () {
    context.strokeStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}
green.onclick = function () {
    context.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
black.onclick = function () {
    context.strokeStyle = 'black'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.add('active')
}

clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

thin.onclick = function () {
    lineWidth = 3
    thin.classList.add('active')
    thick.classList.remove('active')

}

thick.onclick = function () {
    lineWidth = 6
    thin.classList.remove('active')
    thick.classList.add('active')
}

var eraserEnabled = false
eraser.onclick = function() {
    eraserEnabled = true
    brush.classList.remove('active')
    eraser.classList.add('active')
}
brush.onclick = function(){
    eraserEnabled = false
    eraser.classList.remove('active')
    brush.classList.add('active')
}


/******/

function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function() {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1) // 起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (aaa) {
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    canvas.ontouchmove= function (aaa) {
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY

        if (!using) {return}

        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                "x": x,
                "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    canvas.ontouchend = function (aaa) {
        using = false
    }
} else {
    //非触屏设备
    canvas.onmousedown = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    canvas.onmousemove = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY

        if (!using) {return}

        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                "x": x,
                "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }

    }
    canvas.onmouseup = function(aaa) {
        using = false
    }
}

}
