require "time"

module I18n
  class Client
    module Datetime

      # Get the datetime distance between the given date and now in a friendly
      # format.
      #
      # @param time [Time]
      # @option options [Time] :now (Time.now)
      # @option options [String] :offset ("00:00")
      #
      # @return [String]
      def datetime_distance(time, options = {}, scope = locale_scope)
        offset = options.fetch(:offset) { "00:00" }
        now = options.fetch(:now) { Time.now }.localtime(offset)
        time = time.localtime(offset)
        datetime_scope = scope["datetime"]

        result = if time < now
          past_time_distance(datetime_scope, time, now)
        else
          future_time_distance(datetime_scope, time, now)
        end

        result.gsub!(/%[aAbBp]/) do |match|
          case match
          when "%a" then datetime_scope["abbr_day_names"][time.wday].result
          when "%A" then datetime_scope["day_names"][time.wday].result
          when "%b" then datetime_scope["abbr_month_names"][time.mon - 1].result
          when "%B" then datetime_scope["month_names"][time.mon - 1].result
          when "%p" then datetime_scope[time.strftime("%p").downcase].result
          end
        end

        time.strftime(result)
      end

      # Get the time duration in a friendly format.
      #
      # @param duration_in_seconds [Fixnum]
      #
      # @return [String]
      def duration(duration_in_seconds, scope = locale_scope)
        locals = {}

        scope_key = if duration_in_seconds <= 60
          locals[:count] = duration_in_seconds
          "x_seconds"
        elsif duration_in_seconds < 3600
          locals[:count] = duration_in_seconds / 60
          "x_minutes"
        elsif duration_in_seconds <= (3600 * 24)
          locals[:count] = duration_in_seconds / 3600
          "x_hours"
        elsif duration_in_seconds <= (3600 * 24 * 7)
          locals[:count] = duration_in_seconds / 3600 / 24
          "x_days"
        elsif duration_in_seconds <= (3600 * 24 * 30)
          locals[:count] = duration_in_seconds / 3600 / 24 / 7
          "x_weeks"
        elsif duration_in_seconds <= (3600 * 24 * 365)
          locals[:count] = duration_in_seconds / 3600 / 30
          "x_months"
        else
          locals[:count] = duration_in_seconds / 3600 / 24 / 365
          "x_years"
        end

        scope["duration"][scope_key].result(locals)
      end

      private

      # Localize the given date from the past.
      #
      # @param scope [I18n::Scope]
      # @param time [Time]
      # @param now [Time]
      #
      # @result [String]
      def past_time_distance(scope, time, now)
        timespan = (now - time).to_i
        locals = {}

        scope_key = if timespan < 60
          locals[:count] = timespan
          "x_seconds_ago"
        elsif timespan < 3600
          locals[:count] = timespan / 60
          "x_minutes_ago"
        elsif timespan <= (3600 * 3)
          locals[:count] = timespan / 3600
          "x_hours_ago"
        elsif now.to_date == time.to_date
          "same_day_ago"
        elsif now.year == time.year
          "same_year_ago"
        else
          "past_time"
        end

        scope["distance"][scope_key].result(locals)
      end

      # Localize the given date from the past.
      #
      # @param scope [I18n::Scope]
      # @param time [Time]
      # @param now [Time]
      #
      # @return [String]
      def future_time_distance(scope, time, now)
        timespan = (time - now).to_i
        locals = {}

        scope_key = if timespan < 60
          locals[:count] = timespan
          "in_x_seconds"
        elsif timespan < 3600
          locals[:count] = timespan / 60
          "in_x_minutes"
        elsif timespan < (3600 * 3)
          locals[:count] = timespan / 3600
          "in_x_hours"
        elsif now.to_date == time.to_date
          "in_same_day"
        elsif now.year == time.year
          "in_same_year"
        else
          "in_future"
        end

        scope["distance"][scope_key].result(locals)
      end

    end
  end
end
