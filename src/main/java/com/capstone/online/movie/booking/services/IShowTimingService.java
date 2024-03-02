package com.capstone.online.movie.booking.services;

import java.util.List;

import com.capstone.online.movie.booking.entity.ShowTimings;

public interface IShowTimingService {
ShowTimings createShowTime(ShowTimings data);
ShowTimings updateShowTime(ShowTimings data);
ShowTimings getShowTimeById(int id);
List<ShowTimings> getAllShowTime();
String deleteShowTime(int id);
List<ShowTimings> createAll(List<ShowTimings> showTimeList);
}
