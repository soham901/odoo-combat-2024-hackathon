from django.shortcuts import render, redirect, get_object_or_404
from .forms import BookingForm
from .models import Booking, WorkSpace


def create_booking(request, slug):
    workspace = get_object_or_404(WorkSpace, slug=slug)

    if request.method == "POST":
        form = BookingForm(request.POST)
        if form.is_valid():
            booking = form.save(commit=False)
            booking.workspace = workspace
            booking.customer = request.user
            booking.save()
            return render(request, "booking/success.html")
    else:
        form = BookingForm(initial={"workspace": slug})
    return render(request, "booking/create.html", {"form": form})


def booking_success(request):
    return render(request, "booking/success.html")
