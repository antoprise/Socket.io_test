const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


// <!-- ตั้งชื่่อ, เริ่มต้นแชท,{ชื่อ : ข้อความที่เราพิมพ์},กระจาย -->

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/index.html');
});


users = []; // เก็บข้อมูลของ user ที่เชื่อมค่อ
io.on('connection', (socket) => {
    console.log('Connected');
    socket.on('setUsername', (data) => {
        //indexOf หาชื่อใน array user ถ้าเจอก็ return เป็น index
        //data คิอชื่อที่ส่งมาถ้าไม่มีจะ return เป็น -1
        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' มีผู้ใช้ชื่อนี้แล้ว กรุณาใช้ชื่อใหม่');
        } else {
            users.push(data);
            socket.emit('userSet', { username: data });
        }
    })
    socket.on('msg',(data) => {
        io.sockets.emit('newmsg',data);
    });
});

http.listen(3000, () => {
    console.log('Start server on port :3000');
});


//--------------------------------------------------------------------------
/*var clients = 0; // เพื่อนับจำนวนเครื่องที่เชื่อมต่อเข้ามา

io.on('connection', (socket) => {
    clients++;
    // จะเพิ่มคนที่เชื่อมต่อเข้ามา

    io.sockets.emit('broadcast',{message: clients + ' clients connected!'});

    //Event display user connected
    //console.log('Connected');

    //Event disconnect will be display "disconnected"
    socket.on('disconnect', () => {
        clients--; // ลบจำนวนคนที่หลุดออกไป
        io.sockets.emit('broadcast',{message: clients + 'clients connected!'});
        //Event disconnect will be display "disconnected"
        //console.log('Disconnected')
    });
});*/
//---------------------------------------------------------------------------
