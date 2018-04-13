var Progress = function() {
    var progress = {
        textheight: null,
        renderOne: function(id, length, r, percent,text) {
            var canvas = document.getElementById(id);
            var context = canvas.getContext("2d");
            canvas.width = length;
            canvas.height = length;
            var i = 0;
            var interval = setInterval(function() {
                i++;
                progress.render(context, length, r, i, percent,text);
                if (i >= percent) {
                    clearInterval(interval)
                }
            },
            10)
        },
        render: function(context, length, r, i, percent,text) {
            context.clearRect(0, 0, length, length);
            context.beginPath();
            context.lineWidth = r;
            context.arc(length / 2, length / 2, length / 2 - r, -0.5 * Math.PI, -0.5 * Math.PI + i * 0.02 * Math.PI, false);
            context.stroke();
            context.closePath();
            context.beginPath();
            context.strokeStyle = "#e9625e";
            context.font = "18px 微软雅黑";
            context.fillStyle = "#7f7f7f";
            textwidth = context.measureText(text).width;
            if (this.textheight == null) {
                var div = document.createElement("div");
                document.body.appendChild(div);
                div.innerHTML = text;
                div.style.fontSize = ((length / 2 - 2.5 * r) / 2) + "px";
                this.textheight = div.offsetHeight;
                div.parentNode.removeChild(div)
            }
            textheight = this.textheight;
            context.fillText(text, (length - textwidth) / 2, length / 2 + textheight / 4);
            context.fill();
            context.closePath()
        }
    };
    return progress
};