from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=150)
    prompt = models.TextField()
    category = models.CharField(max_length=100, default="Dashboard")
    preview_data = models.TextField()  # Storing serialized JSON configuration of the dashboard elements
    code_html = models.TextField(blank=True, default="")
    code_css = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    company = models.CharField(max_length=100, blank=True, default="")
    service = models.CharField(max_length=100, blank=True, default="")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email}) for {self.company}"
