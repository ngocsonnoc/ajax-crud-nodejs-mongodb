 $(function() {
     const URI = '/api/courses'
         //get API
     $('#getCourse').on('click', () => {
         console.log(1)
         $.ajax({
             url: URI,
             method: 'GET',
             success: function(data) {
                 console.log(data)
                 let tbody = $('tbody');
                 let i = 1;
                 tbody.html('')
                 data.courses.forEach(course => {
                     tbody.append(`
                    <tr>
                        <td> ${i++}</td>
                        <td class="name">${course.name}</td>
                        <td class="price">${course.price}</td>
                        <th>
                            <button class="btn btn-danger" id="deleteCourse"> Xóa</button>
                            <button class="btn btn-success" id="selectCourse"> Chọn</button>
                        </th>
                        <td style="visibility:hidden;width:20px" class="idCourse">${course._id}</td>

                    </tr>
                            `)
                 });
             }
         })
     })

     $('table').on('click', '#selectCourse', function() {
         let row = $(this).closest('tr');
         let name = row.find('.name').text()
         let price = row.find('.price').text()
         let id = row.find('.idCourse').text()
         $('#name').val(name)
         $('#price').val(price)
         $('#idCourse').val(id)
         $(':input[type="button"]').prop('disabled', false);
     })

     //POST API
     $('#courseForm').on('submit', (e) => {
         e.preventDefault();
         let name = $('#name');
         let price = $('#price');
         $.ajax({
             url: URI,
             method: 'POST',
             data: {
                 name: name.val(),
                 price: price.val()
             },
             success: function(response) {
                 name.val('')
                 price.val('')
                 $('#getCourse').click();
             },
             error: function(err) {
                 console.log(err)
             }
         })
     })
     $('table').on('click', '#deleteCourse', function() {
         let row = $(this).closest('tr');
         let id = row.find('.idCourse').text()
         console.log(id)
         $.ajax({
             url: URI + '/' + id,
             method: 'DELETE',
             data: {
                 id: id
             },
             success: function(response) {
                 $('#name').val('')
                 $('#price').val('')
                 $(':input[type="button"]').prop('disabled', true);
                 $('#getCourse').click();
                 alert("Xoa thanh cong!!")

             }
         })
     })
     $('#updateBtn').on('click', () => {
         let name = $('#name');
         let price = $('#price');
         let id = $('#idCourse')
         $.ajax({
             url: URI + '/' + id,
             type: 'PUT',
             data: {
                 id: id.val(),
                 name: name.val(),
                 price: price.val()
             },
             success: function(res) {
                 $('#name').val('')
                 $('#price').val('')
                 $(':input[type="button"]').prop('disabled', true);
                 $('#getCourse').click();
                 alert("Cap nhat thanh cong !!")
             }
         })
         console.log(id.val())
     })

 })