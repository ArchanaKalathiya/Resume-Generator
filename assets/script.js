document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (this.checkValidity()) {
        generateResumePreview(this);
    } else {
        console.log('Form is not valid');
    }
});
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgPreview = document.createElement('img');
        imgPreview.src = event.target.result;
        imgPreview.style.maxWidth = '100px';
        const imagePreview = document.getElementById('imagePreview');

        if (imagePreview.firstChild) {
            imagePreview.removeChild(imagePreview.firstChild);
        }
        imagePreview.appendChild(imgPreview);
    };
    reader.readAsDataURL(file);
}
function generateResumePreview(form) {
    const formData = new FormData(form);
    const previewDiv = document.getElementById('resumePreview');
    previewDiv.style.display = 'block';
    const imageFile = formData.get('file');
    previewDiv.innerHTML = `
    <div id=resume>
        <div class="preview-content">
            <div class="personal-info-container">
                <div class="personal-info">
                    <p><strong style="font-size: 24px;">${formData.get('name')}</strong></p><hr>
                    <p><strong>Email:</strong> ${formData.get('email')}</p>
                    <p><strong>Phone:</strong> ${formData.get('phone')}</p>
                    <p><strong>Linkedin URL:</strong> ${formData.get('url')}</p><hr>
                </div>
                    <div class="image-preview-container">
                        <div class="image-preview">
                            <img src="${URL.createObjectURL(imageFile)}" alt="Profile Image">
                        </div>
                    </div>
                </div>

                    <div class="other-sections">
                        <p><strong>Objective:</strong><br>${formData.get('objective')}</p><hr>
                        <p><strong>Skills : </strong> ${formData.getAll('skills').join(', ')}</p><hr>
                        <p><strong>Experience :</strong> ${formData.get('experience')}</p><hr>
                        <p><strong>Certifications : </strong><br>${formData.get('certifications')}</p><hr><br><br>
                    </div>
            </div>
        </div>
    </div><br>
    <button onclick="printpdf()">Download Resume</button><br>
    `;
    document.getElementById("resumeHeader").style.display = 'none';
    form.style.display = 'none';
}
function printpdf() {
    var content = document.getElementById("resume");
  
    const allButtons = document.querySelectorAll("#print button");
    allButtons.forEach(button => {
        button.classList.add("none");
    });
    let allInputCheckboxes = document.querySelectorAll(".input-checkbox");
    allInputCheckboxes.forEach(input => {
        input.classList.add("none");
    })
  
  allButtons.forEach(button => {
      button.classList.remove("none");
  })
  allInputCheckboxes.forEach(input => {
      input.classList.remove("none");
  })
  
    html2pdf(content, {
        html2canvas: { scale: 1, logging: true, dpi: 500 }
    });
  }