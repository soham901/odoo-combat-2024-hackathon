from django.db import models

from workspaces.models import WorkSpace
from customer.models import Customer


class Booking(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    workspace = models.ForeignKey(WorkSpace, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(
        max_length=20,
        choices=(
            ("Pending", "Pending"),
            ("Confirmed", "Confirmed"),
            ("Cancelled", "Cancelled"),
        ),
        default="Pending",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.user.username} - {self.workspace.name}"
